import React from "react";
import "./App.css";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Login Form</label>
        </div>
        <div>
          <input
            type="text"
            {...register("id", { required: "값 입력해 주셈." })}
          />
          {errors.id && <span>{errors.id.message}</span>}
        </div>
        <div>
          <input
            type="password"
            {...register("passwd", { required: "값 입력해 주셈." })}
          />
          {errors.passwd && <span>{errors.passwd.message}</span>}
        </div>
        <div>
          <input
            type="password"
            {...register("confirmPasswd", {
              required: "값 입력해주셈",
              validate: {
                check: (val) => {
                  if (getValues("passwd") !== val) {
                    return "이상한 비밀번호네염";
                  }
                },
              },
            })}
          />
          {errors.confirmPasswd && <span>{errors.confirmPasswd.message}</span>}
        </div>
        <div>
          <button type="submit">들어가겠음</button>
        </div>
      </form>
    </>
  );
}
