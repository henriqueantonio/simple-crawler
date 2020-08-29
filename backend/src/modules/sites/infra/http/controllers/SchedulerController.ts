import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSchedulerService from '@modules/sites/services/CreateSchedulerService';
import ListSchedulerService from '@modules/sites/services/ListSchedulerService';
import ListOneSchedulerService from '@modules/sites/services/ListOneSchedulerService';
import DeleteSchedulerService from '@modules/sites/services/DeleteSchedulerService';
import UpdateSchedulerService from '@modules/sites/services/UpdateSchedulerService';

class SchedulerController {
  public show(request: Request, response: Response) {
    const { siteName }: any = request.params;

    const listOneSchedulerService = container.resolve(ListOneSchedulerService);

    const schedule = listOneSchedulerService.execute(siteName);

    return response.json(schedule);
  }

  public index(_: Request, response: Response) {
    const listSchedulerService = container.resolve(ListSchedulerService);

    const jobs = listSchedulerService.execute();

    return response.json(jobs);
  }

  public async create(request: Request, response: Response) {
    const { id } = request.params;
    const { expression } = request.body;

    const createSchedulerService = container.resolve(CreateSchedulerService);

    await createSchedulerService.execute({ expression, id });

    return response.json({ success: 'job created' });
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.body;

    const deleteSchedulerService = container.resolve(DeleteSchedulerService);

    await deleteSchedulerService.execute(id);

    return response.json({ success: 'Job deleted' });
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { expression } = request.body;

    const updateSchedulerService = container.resolve(UpdateSchedulerService);

    const job = updateSchedulerService.execute({ jobID: id, expression });

    return response.json(job);
  }
}

export default SchedulerController;
