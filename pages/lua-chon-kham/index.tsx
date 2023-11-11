import {  useRef, useState } from "react";
import "./../../app/globals.css";
import axios from "axios";
import Header from "@/components/Heaser";
import Footer from "@/components/footer";
import Link from "next/link";

export default function DatLichKham() {

  return (
    <div className="bg-white">
      <Header />
      <main className="w-full">
        <div className="bg-gray-100">
          <section
            className="cover bg-blue-teal-gradient relative bg-blue-600 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-48 flex
      items-center justify-center min-h-screen"
          >
            <div className="h-full absolute top-0 left-0 z-0">
              <img
                src="/cover-bg.jpg"
                alt=""
                className="w-full h-full object-cover opacity-20"
              />
            </div>

            <div className="z-10">
              <div>
                <h2 className="text-white text-3xl md:text-4xl xl:text-5xl font-bold leading-tight">
                  Đặt lịch khám bệnh trực tuyến
                </h2>
                <Link href={'ho-so-benh-an'}>
                <button
                  className="w-full my-4 px-4 py-3 text-xl font-bold text-white bg-orange-600 rounded-md border-solid border-2 border-orange-600"
                >
                  Đặt lịch khám online
                </button>
                </Link>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="block rounded-lg bg-white p-4 flex flex-col justify-center items-center">
                    <img src="/phieu.png" alt="" className="w-20 h-20" />
                    <div>
                      <h2 className="text-blue-700 font-bold text-lg mt-4">
                        Phiếu khám bệnh
                      </h2>
                    </div>
                  </div>
                  <div className="block rounded-lg bg-white p-4 flex flex-col justify-center items-center">
                    <img src="/lich.png" alt="" className="w-20 h-20" />
                    <div>
                      <h2 className="text-blue-700 font-bold text-lg mt-4">
                        Lịch tái khám
                      </h2>
                    </div>
                  </div>
                  <div className="block rounded-lg bg-white p-4 flex flex-col justify-center items-center">
                    <img src="/card.png" alt="" className="w-20 h-20" />
                    <div>
                      <h2 className="text-blue-700 font-bold text-lg mt-4">
                        Thanh toán viện phí nội trú
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
