// import * as React from "react";
import { useForm } from "react-hook-form";

export default function Contact() {

 const {register, handleSubmit, formState: {errors} } = useForm(); 
//  console.log(errors);

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
        <span>{errors.firstname?.message}</span>
        <input
          {...register("lastname", { required: "Feltet er ikke udfyldt" })}
          placeholder="Efternavn"
        ></input>
        <span>{errors.lastname?.message}</span>
        <input
          {...register("email", { required: "Feltet er ikke udfyldt" })}
          placeholder="Email"
        ></input>
        <p>{errors.email?.message}</p>
        <input type="number"
          {...register("phone", { valueAsNumber: true,
            required: "Feltet er ikke udfyldt",
            minLength: {value: 8, message: "Telefon nummeret skal være 8 cifre"},
          })}
          placeholder="Telefon nummer"
        ></input>
        <span>{errors.phone?.message}</span>
        <input
          {...register("company", { required: "Feltet er ikke udfyldt" })}
          placeholder="Virksomhedens navn"
        ></input>
        <span>{errors.company?.message}</span>
        <input
          {...register("address", { required: "Feltet er ikke udfyldt" })}
          placeholder="Adresse"
        ></input>
        <span>{errors.address?.message}</span>
        <input
          {...register("introduction", { required: "Feltet er ikke udfyldt"  })}
          placeholder="Kort introduktion"
        ></input>
        <span>{errors.introduction?.message}</span>
        <button>Submit</button>
      </form>
    </div>
  );
}
