import { z } from 'zod';

const UserCreateSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(255, { message: 'Name must not exceed 255 characters' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

const UpdatePasswordSchema = z.object({
  current_password: z
    .string()
    .min(1, { message: 'Current password is required' }),
  new_password: z
    .string()
    .min(8, { message: 'New password must be at least 8 characters long' }),
});

const UserLoginSchema = UserCreateSchema.omit({ name: true });
const UpdateNameSchema = UserCreateSchema.omit({ email: true, password: true });

type UserCreateData = Partial<z.infer<typeof UserCreateSchema>>;
type UserLoginData = Partial<z.infer<typeof UserLoginSchema>>;
type UpdateNameData = z.infer<typeof UpdateNameSchema>;
type UpdatePasswordData = z.infer<typeof UpdatePasswordSchema>;

export const validateCreateUserData = (data: UserCreateData) => {
  return UserCreateSchema.safeParse(data);
};

export const validateLoginUserData = (data: UserLoginData) => {
  return UserLoginSchema.safeParse(data);
};

export const validateUpdateNameData = (data: UpdateNameData) => {
  return UpdateNameSchema.safeParse(data);
};

export const validateUpdatePasswordData = (data: UpdatePasswordData) => {
  return UpdatePasswordSchema.safeParse(data);
};
