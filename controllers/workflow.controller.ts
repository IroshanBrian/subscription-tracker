import { serve, WorkflowContext } from "@upstash/workflow";
import Subscription from "../models/subscription.model";
import dayjs from "dayjs";
import logger from "../utils/logger";

const REMINDERS = [7, 5, 2, 1];

export const sentReminder = serve(async (context: WorkflowContext) => {
  const { subscriptionId } = context.requestPayload as {
    subscriptionId: string;
  };

  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    logger.info(
      `Subscription ${subscriptionId} is due for renewal. Stopping reminder.`
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(context, `reminder-${daysBefore}`, reminderDate);
    }
    await triggerReminder(context, `reminder-${daysBefore}`);
  }
});

const fetchSubscription = async (
  context: WorkflowContext,
  subscriptionId: string
) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (
  context: WorkflowContext,
  label: string,
  date: dayjs.Dayjs
) => {
  logger.info(`Sleeping until ${label} at ${date.toISOString()}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context: WorkflowContext, label: string) => {
  return await context.run(label, async () => {
    logger.info(`Triggering reminder for subscription`);
  });
};
