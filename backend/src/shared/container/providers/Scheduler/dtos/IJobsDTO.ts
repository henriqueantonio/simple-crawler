import { ScheduledTask } from 'node-cron';

export default interface IJobsDTO {
  id: string;
  job: ScheduledTask;
  expression: string;
}
