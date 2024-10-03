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

    // Provera da li se lozinke poklapaju
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
        alert(data.message || "Uspešno ste se registrovali!");
        navigate("/signin"); // Preusmeravanje na stranicu za prijavu
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
    <div className="bg-white px-20 py-20 rounded-3xl border-2 border-gray xl:flex xl:justify-center xl:items-center w-full h-screen">
      <div className="xl:w-1/2">
        <h1 className="text-5xl font-semibold text-center">Registracija</h1>
        <p className="font-medium text-lg text-gray-500 mt-4 text-center">
          Unesite svoje podatke za registraciju
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <label className="text-lg font-medium" htmlFor="name">
              Ime:
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
              placeholder="Unesite svoje ime"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="text-lg font-medium" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
              placeholder="Unesite svoj email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="text-lg font-medium" htmlFor="password">
              Lozinka:
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
              placeholder="Unesite svoju lozinku"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="text-lg font-medium" htmlFor="password_confirmation">
              Potvrdi lozinku:
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
              placeholder="Potvrdite svoju lozinku"
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
              className="bg-violet-500 text-white text-lg font-bold rounded-xl p-3"
            >
              Registruj se
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>} {/* Prikazivanje greške */}
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-500">Već imate nalog?</p>
          <button
            onClick={() => navigate("/signin")}
            className="text-violet-500 font-medium"
          >
            Prijavite se
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
