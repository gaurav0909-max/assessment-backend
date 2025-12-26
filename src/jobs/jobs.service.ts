import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { randomUUID } from 'crypto';

const jobQueue = new Queue('jobs', {
    connection: {
        host: 'localhost',
        port: 6379,
    },
});

@Injectable()
export class JobsService {
    async submitJob(payload: any) {
        const jobId = randomUUID();

        await jobQueue.add(
            'execute-task',
            payload,
            {
                jobId,
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 2000,
                },
            },
        );

        return {
            jobId,
            status: 'queued',
        };
    }
}
