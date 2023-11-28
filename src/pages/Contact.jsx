// import * as React from "react";
import { useForm } from "react-hook-form";

export default function Contact() {

 const {register, handleSubmit, formState: {errors} } = useForm(); 
 console.log(errors);

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <input
          {...register("firstname", { required: "Feltet er ikke udfyldt" })}
          placeholder="Fornavn"
        ></input>
        <p>{errors.firstname?.message}</p>
        <input
          {...register("lastname", { required: "Feltet er ikke udfyldt" })}
          placeholder="Efternavn"
        ></input>
        <p>{errors.lastname?.message}</p>
        <input
          {...register("email", { required: "Feltet er ikke udfyldt" })}
          placeholder="Email"
        ></input>
        <p>{errors.email?.message}</p>
        <input
          {...register("phone", {
            required: "Feltet er ikke udfyldt",
            minLength: {value: 8, message: "Telefon nummeret skal være 8 cifre"},
          })}
          placeholder="Telefon nummer"
        ></input>
        <p>{errors.phone?.message}</p>
        <input
          {...register("company", { required: "Feltet er ikke udfyldt" })}
          placeholder="Virksomheds navn"
        ></input>
        <p>{errors.company?.message}</p>
        <input
          {...register("address", { required: "Feltet er ikke udfyldt" })}
          placeholder="Adresse"
        ></input>
        <p>{errors.address?.message}</p>
        <input
          {...register("introduction", { required: "Feltet er ikke udfyldt"  })}
          placeholder="Kort introduktion"
        ></input>
        <p>{errors.introduction?.message}</p>
        <button>Submit</button>
      </form>
    </div>
  );
}
