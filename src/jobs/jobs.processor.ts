import { Worker } from 'bullmq';

export class JobsProcessor {
    constructor() {
        new Worker(
            'jobs',
            async job => {
                // Simulate async processing
                await new Promise(res => setTimeout(res, 3000));

                if (Math.random() < 0.2) {
                    throw new Error('Simulated job failure');
                }

                return {
                    output: `Job ${job.id} completed successfully`,
                };
            },
            {
                connection: {
                    host: 'localhost',
                    port: 6379,
                },
            },
        );
    }
}
