// import * as React from "react";
import { useForm } from "react-hook-form";
// import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

// export const ContactUs = () => {
//   const form = useRef();
// }

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  //  console.log(errors);

  const sendEmail = (e) => {
    console.log(e);
    // e.preventDefault();
    // console.log(e.target);

    emailjs.sendForm(`service_mo1481e`, `template_3x3y7gc`, e, `QennLeEfNjWQd9kMQ`).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  // onSubmit={handleSubmit( (data) => {
  //           console.log(data);
  //         })}

  return (
    <div>
      <form onSubmit={handleSubmit(sendEmail)}>
        <input {...register("firstname", { required: "Feltet er ikke udfyldt" })} placeholder="Fornavn"></input>
        <span>{errors.firstname?.message}</span>
        <input {...register("lastname", { required: "Feltet er ikke udfyldt" })} placeholder="Efternavn"></input>
        <span>{errors.lastname?.message}</span>
        <input {...register("email", { required: "Feltet er ikke udfyldt" })} placeholder="Email"></input>
        <span>{errors.email?.message}</span>
        <input type="number" {...register("phone", { valueAsNumber: true, required: "Feltet er ikke udfyldt", minLength: { value: 8, message: "Telefon nummeret skal være 8 cifre" } })} placeholder="Telefon nummer"></input>
        <span>{errors.phone?.message}</span>
        <input {...register("company", { required: "Feltet er ikke udfyldt" })} placeholder="Virksomhedens navn"></input>
        <span>{errors.company?.message}</span>
        <input {...register("address", { required: "Feltet er ikke udfyldt" })} placeholder="Adresse"></input>
        <span>{errors.address?.message}</span>
        <input {...register("introduction", { required: "Feltet er ikke udfyldt" })} placeholder="Kort introduktion"></input>
        <span>{errors.introduction?.message}</span>
        <button>Submit</button>
      </form>
    </div>
  );
}
