"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { DatePicker } from "./ui/date-picker";
import { getUsers, saveUser } from "@/utils/api";
import {
  userInfoSchema,
  UserInfoType,
  BusinessActivityFamilyEnum,
} from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";

const useDynamicForm = () => {
  const { toast } = useToast();

  const form = useForm<UserInfoType>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: undefined,
      email: "",
      phoneNumber: "",
      businessActivityFamily: BusinessActivityFamilyEnum.Conseil,
      insuranceDate: undefined,
      agreeWithPolicy: false,
    },
  });

  const { mutate } = useMutation({
    mutationFn: (values: UserInfoType) => saveUser(values),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: "There was an error" });
        return;
      }

      toast({
        title: "Insurance price",
        description: data.price,
      });
    },
  });

  const onSubmit = async (data: UserInfoType) => {
    mutate(data);
  };

  return { form, onSubmit };
};

export const DynamicForm = () => {
  const { form, onSubmit } = useDynamicForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border flex flex-col max-w-md m-auto p-6 mt-10 rounded-lg gap-2 min-w-[450px]"
      >
        <h2 className="text-2xl text-center">Enter User Information</h2>

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <div className="flex flex-col">
                <FormLabel className="mb-2">Date of Birth</FormLabel>
                <DatePicker date={field.value} setDate={field.onChange} />
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessActivityFamily"
          render={({ field }) => {
            return (
              <FormItem className="flex-grow">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormLabel>Business Activity Family</FormLabel>

                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Business Activity Family" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(BusinessActivityFamilyEnum).map((item) => {
                      return (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="insuranceDate"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <div className="flex flex-col">
                <FormLabel className="mb-2">Insurance Date</FormLabel>
                <DatePicker date={field.value} setDate={field.onChange} />
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agreeWithPolicy"
          render={({ field }) => (
            <FormItem className="flex justify-start items-start">
              <FormLabel className="my-2 mr-2">Agree with Policy</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={!form.getValues("agreeWithPolicy")}>Send data</Button>
      </form>
    </Form>
  );
};
