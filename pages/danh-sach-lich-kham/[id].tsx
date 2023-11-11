import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "./../../app/globals.css";
import axios from "axios";
import Header from "@/components/Heaser";
import Footer from "@/components/footer";
import { useForm } from "react-hook-form";
import SectionList from "./SectionDanhSachLichKham";
import { useRouter } from "next/router";

export default function DatLichKham() {
  const [open, setOpen] = useState(false);
  const refDropzone = React.useRef<any>()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter()


  return (
    <div className="bg-white">
      <Header />
      <main className="w-full">
        <div className="bg-gray-200">
          <section className="cover bg-gray-200 relative bg-white px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-4">
            <p className="text-indigo-600 text-2xl font-bold mb-4">Lịch khám bệnh của tôi</p>
            
            <SectionList ref={refDropzone} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
