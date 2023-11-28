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
        <input
          {...register("lastname", { required: "Feltet er ikke udfyldt" })}
          placeholder="Efternavn"
        ></input>
        <input
          {...register("email", { required: "Feltet er ikke udfyldt" })}
          placeholder="Email"
        ></input>
        <input
          {...register("phone", {
            required: "Feltet er ikke udfyldt",
            minLength: {value: 8, message: "Telefon nummeret skal være 8 cifre"},
          })}
          placeholder="Telefon nummer"
        ></input>
        <input
          {...register("company", { required: "Feltet er ikke udfyldt" })}
          placeholder="Virksomheds navn"
        ></input>
        <input
          {...register("address", { required: "Feltet er ikke udfyldt" })}
          placeholder="Adresse"
        ></input>
        <input
          {...register("introduction", { required: "Feltet er ikke udfyldt"  })}
          placeholder="Kort introduktion"
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}
