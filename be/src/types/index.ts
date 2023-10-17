import {z} from "zod"

export const UserLoginSchema = z.object({
    email: z.string().email("Please enter valid email"),
    password: z.string().min(1,{message:"Please enter valid password"})
})

export const UserRegisterSchema = z.object({
    email: z.string().email("Please enter valid email"),
    userName: z.string().min(3,{message:"Must be at least 3 character"}).max(15,{message:"Must be less than 15 character"}).refine((value) => value.trim() !== '', {
        message: 'Space-only values are not allowed'}),
    fullName: z.string().min(3,{message:"Must be at least 3 character"}).max(30,{message:"Must be less than 30 character"}).refine((value) => value.trim() !== '', {
        message: 'Space-only values are not allowed'}),
    password: z.string().min(8,{message:"Must be at least 8 characters"})
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
                    message: 'Must contain at least one uppercase, one lowercase, one number, and one special character'}),
    url: z.string().optional()
})

export const PostSchema = z.object({
    content: z.string(),
    photo:z.string().optional()
})

export const FriendRequestSchema = z.object({
    requestFrom: z.string(),
    requestTo: z.string()
})