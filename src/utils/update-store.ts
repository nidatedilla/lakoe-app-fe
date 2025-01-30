import {z} from 'zod';

export const updateStoreShema = z.object({
    name: z.string().optional(),
    description: z.any(),
    banner: z.any(),
    logo: z.any(),
    slogan: z.any(),
}) 

export type updateStore = z.infer<typeof updateStoreShema>