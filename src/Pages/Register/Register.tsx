import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Provjera da li se lozinke poklapaju
    if (form.password !== form.password_confirmation) {
      alert("Lozinke se ne poklapaju");
      return;
    }

    try {
      // API poziv za registraciju
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirmation: form.password_confirmation,
        }),
      });

      // Rukovanje odgovorom sa servera
      if (response.status === 201) {
        const data = await response.json();
        alert(data.message || "Uspješno ste se registrovali!");
        navigate("/signin"); // Preusmjeravanje na stranicu za prijavu
      } else if (response.status === 422) {
        const data = await response.json();
        setError(data.message || "Greška u validaciji podataka.");
      } else {
        setError("Došlo je do greške prilikom registracije.");
      }
    } catch (error) {
      console.error("Greška:", error);
      setError("Dogodila se greška prilikom registracije.");
    }
  };

  return (
    <div className="bg-white px-20 py-10 rounded-3xl border-2 border-gray-300"> 
      <h1 className="text-5xl font-semibold text-black"> 
        Registracija
      </h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Unesite svoje podatke za registraciju
      </p>
      <form onSubmit={handleSubmit} className="mt-8">
        <div>
          <label className="text-lg font-medium">Ime:</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Unesite svoje ime"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium">Email:</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Unesite svoj email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium">Lozinka:</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Unesite lozinku"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium">Potvrdi lozinku:</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Potvrdite lozinku"
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="bg-violet-500 text-white text-lg font-bold rounded-xl p-4"
          >
            Registruj se
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center mt-4">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="mx-4 text-gray-400">or</span>
        <div className="border-t border-gray-300 w-full"></div>
      </div>
      <div className="mt-4 flex flex-col gap-y-4">
        <button
          className="bg-gray-500 text-white text-lg font-bold rounded-xl p-4"
          onClick={() => navigate("/signin")}
        >
          Prijavite se
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default RegisterPage;
