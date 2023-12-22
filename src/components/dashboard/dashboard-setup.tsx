"use client";

import React from "react";
import { AuthUser } from "@supabase/supabase-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmojiPicker from "@/components/emoji-picker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import Loader from "@/components/ui/loader";
import { CreateWorkspaceFormSchema } from "@/lib/types";
import { v4 } from "uuid";
import {Subscription, Workspace} from "@/lib/supabase/supabase.types";
import { useRouter } from "next/navigation";
import { useAppState } from "@/lib/providers/app-state-provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";
import { createWorkspace } from "@/lib/supabase/queries";

interface DashboardSetupProps {
  user: AuthUser;
  subscription: Subscription;
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({
  user,
  subscription,
}) => {
  const [selectedEmoji, setSelectedEmoji] = React.useState("🍂");
  const router = useRouter();
  const {dispatch} = useAppState();
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
    mode: "onChange",
    defaultValues: {
      workspaceLogo: "",
      workspaceName: "",
    },
  });

  function handleSelectEmoji(emoji: string) {
    setSelectedEmoji(emoji);
  }

  const onSubmit: SubmitHandler<
      z.infer<typeof CreateWorkspaceFormSchema>
  > = async (value) => {
    const workspaceUUID = v4();
    const file = value.workspaceLogo?.[0];
    let filePath = null;

    if (file) {
      try {
        const { data, error } = await supabase.storage
            .from('workspace-logos')
            .upload(`workspaceLogo.${workspaceUUID}`, file, {
              cacheControl: '3600',
              upsert: true,
            });
        if (error) {
          toast({
            variant: 'destructive',
            title: error.message,
          })
          console.error(error);
          return reset();
        }
        filePath = data.path;
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Error! Could not upload your workspace logo',
        });
        return reset();
      }
    }
    try {
      const newWorkspace: Workspace = {
        data: null,
        createdAt: new Date().toISOString(),
        iconId: selectedEmoji,
        id: workspaceUUID,
        inTrash: '',
        title: value.workspaceName,
        workspaceOwner: user.id,
        logo: filePath || null,
        bannerUrl: '',
      };
      const { data, error: createError } = await createWorkspace(newWorkspace);
      if (createError) {
        throw new Error();
      }
      dispatch({
        type: 'ADD_WORKSPACE',
        payload: { ...newWorkspace, folders: [] },
      });

      toast({
        title: 'Workspace Created',
        description: `${newWorkspace.title} has been created successfully.`,
      });

      router.replace(`/dashboard/${newWorkspace.id}`);
    } catch (error) {
      console.log(error, 'Error');
      toast({
        variant: 'destructive',
        title: 'Could not create your workspace',
        description:
            "Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.",
      });
    } finally {
      reset();
    }
  };

  return (
    <Card className="w-[800px] h-screen sm:h-auto">
      <CardHeader>
        <CardTitle>Create a workspace!</CardTitle>
        <CardDescription>
          <p>It looks like you don&apos;t have a workspace yet.</p>
          <p>Let&apos;s create one!</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div
                className="flex items-center gap-4"
            >
              <div className="text-5xl">
                <EmojiPicker getEmoji={handleSelectEmoji}>
                  {selectedEmoji}
                </EmojiPicker>
              </div>
              <div className="w-full ">
                <Label
                    htmlFor="workspaceName"
                    className="text-sm text-muted-foreground"
                >
                  Name
                </Label>
                <Input
                    id="workspaceName"
                    type="text"
                    placeholder="Workspace Name"
                    disabled={isLoading}
                    {...register('workspaceName', {
                      required: 'Workspace name is required',
                    })}
                />
                <small className="text-red-600">
                  {errors?.workspaceName?.message?.toString()}
                </small>
              </div>
            </div>
            <div>
              <Label
                  htmlFor="workspaceLogo"
                  className="text-sm text-muted-foreground"
              >
                Workspace Logo
              </Label>
              <Input
                  id="workspaceLogo"
                  type="file"
                  accept="image/*"
                  placeholder="Workspace Logo"
                  // disabled={isLoading || subscription?.status !== 'active'}
                  disabled={isLoading}
                  {...register('workspaceLogo', {
                    required: false,
                  })}
              />
              <small className="text-red-600">
                {errors?.workspaceLogo?.message?.toString()}
              </small>
              {subscription?.status !== 'active' && (
                  <small
                      className=" text-muted-foreground block"
                  >
                    To customize your workspace, you need to be on a Pro Plan
                  </small>
              )}
            </div>
            <div className="self-end">
              <Button
                  disabled={isLoading}
                  type="submit"
              >
                {!isLoading ? 'Create Workspace' : <Loader />}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardSetup;
