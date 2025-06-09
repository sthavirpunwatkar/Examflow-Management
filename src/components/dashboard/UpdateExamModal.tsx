"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { Exam } from '@/lib/types';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface UpdateExamModalProps {
  exam: Exam;
  onUpdate: (examId: string, data: Partial<Exam>) => Promise<void>;
  children: React.ReactNode; // Trigger element
}

const formSchema = z.object({
  status: z.enum(["scheduled", "in-progress", "completed"]),
  room: z.string().min(1, "Room assignment is required."),
  dateTime: z.date({ required_error: "Exam date and time is required." }),
});

export default function UpdateExamModal({ exam, onUpdate, children }: UpdateExamModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: exam.status,
      room: exam.room,
      dateTime: exam.dateTime ? parseISO(exam.dateTime) : new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const updateData: Partial<Exam> = {
        status: values.status,
        room: values.room,
        dateTime: values.dateTime.toISOString(), // Store as ISO string
      };
      await onUpdate(exam.id, updateData);
      toast({
        title: "Exam Updated",
        description: `Details for ${exam.studentName}'s exam have been updated.`,
      });
      setOpen(false);
      form.reset({ // Reset form with new values, useful if parent state updates immediately
        status: values.status,
        room: values.room,
        dateTime: values.dateTime,
      });
    } catch (error) {
      console.error("Failed to update exam:", error);
      toast({
        title: "Update Failed",
        description: "Could not update exam details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Update Exam for {exam.studentName}</DialogTitle>
          <DialogDescription>
            Modify the status, room, or timing for {exam.subject}. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Lab A, Room 101" {...field} disabled={loading}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Exam Date & Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={loading}
                        >
                          {field.value ? (
                            format(field.value, "PPPp") // Format includes time
                          ) : (
                            <span>Pick a date and time</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                            if (date) {
                                const currentHours = field.value?.getHours() ?? 0;
                                const currentMinutes = field.value?.getMinutes() ?? 0;
                                date.setHours(currentHours, currentMinutes);
                                field.onChange(date);
                            }
                        }}
                        disabled={(date) => date < new Date("1900-01-01") || loading}
                        initialFocus
                      />
                      {/* Basic Time Picker - could be enhanced */}
                      <div className="p-2 border-t border-border">
                        <Input
                            type="time"
                            defaultValue={field.value ? format(field.value, "HH:mm") : "09:00"}
                            onChange={(e) => {
                                const [hours, minutes] = e.target.value.split(':').map(Number);
                                const newDate = field.value ? new Date(field.value) : new Date();
                                newDate.setHours(hours, minutes);
                                field.onChange(newDate);
                            }}
                            disabled={loading}
                         />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
