import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { trpcClient } from "../services/trpcClient";
import { toast } from "react-toastify";

type CreateUserModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type IFormInput = {
  firstName: string;
  lastName: string;
  age: number;
};

export const CreateUserModal = ({
  open,
  onOpenChange,
}: CreateUserModalProps) => {
  const createUserMutation = trpcClient.user.createUser.useMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInput>();

  const onSubmit = async (values: IFormInput) => {
    values.age = Number(values.age);

    const result = await createUserMutation.mutateAsync(values).catch((err) => {
      toast(JSON.parse(err.message)[0]?.message || "Something went wrong!", {
        type: "error",
      });
    });

    if (result) {
      onOpenChange(false);
      reset();

      toast("User created successfully", {
        type: "success",
      });
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger />
      <Dialog.Overlay className="bg-black/[0.5] fixed left-0 top-0 h-screen w-screen" />
      <Dialog.Content className="bg-white p-4 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg min-w-[400px] ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                id="firstName"
                className="border rounded w-full py-2 px-3 text-gray-700"
                {...register("firstName", { required: true })}
              />
              <span className="text-red-500">{errors.firstName?.message}</span>
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                id="lastName"
                className="border rounded w-full py-2 px-3 text-gray-700"
                {...register("lastName", { required: true })}
              />
              <span className="text-red-500">{errors.lastName?.message}</span>
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="age">
                Age <span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="number"
                id="age"
                className="border rounded w-full py-2 px-3 text-gray-700"
                {...register("age", { required: true })}
              />

              <span className="text-red-500">{errors.age?.message}</span>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-green-600 hover:green-blue-700 text-white font-bold py-2 px-4 rounded "
                type="submit"
                disabled={!isValid}
                style={{ backgroundColor: !isValid ? "#ccc" : "#1d4ed8" }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
