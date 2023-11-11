import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SectionList = React.forwardRef(function SectionTPHS(props: Props, ref) {
    const [data, setData] = useState([])
    const router = useRouter()

    const getData = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        if (typeof window !== 'undefined') {
            const item: any = JSON.parse(localStorage.getItem('benhnhan')) || {}
            const sdt = item?.sdt
            const res = await axios.post(
                `http://localhost:5000/api/thongtinbenhnhan/laytheosodienthoai`,
                { sodienthoai: sdt },
                config
            );
            setData(res.data?.thongTinBenhNhan)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    function padTo2Digits(num: any) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date: any) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
    }
    React.useImperativeHandle(ref, () => ({
        getData
    }))
    return (
        <>
            <div className="w-full flex flex-col gap-4 h-screen">
                {data?.map((item: any) =>
                    <div
                        className="rounded-sm w-full grid grid-cols-12 bg-white shadow p-3 gap-2 items-center 
                        "
                       
                    >
                        <div className="col-span-12 md:col-span-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#2563eb"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                />
                            </svg>
                        </div>
                        {/* Title */}
                        <div className="col-span-11 xl:-ml-5">
                            <p className="text-blue-600 font-semibold">
                                Số bảo hiểm Y tế: &nbsp;
                                {item.soBHYT}
                            </p>
                        </div>
                        {/* Description */}
                        <div className="md:col-start-2 col-span-8 xl:-ml-5">
                            <p className="text-sm text-gray-800 font-light">
                                Tên bệnh nhân: {item.hoten}
                            </p>
                            <p className="text-sm text-gray-800 font-light">
                                Ngày sinh: {formatDate(new Date(item.ngaysinh))}
                            </p>
                            <p className="text-sm text-gray-800 font-light">
                                Nghề nghiệp: {item.nghenghiep}
                            </p>
                            <p className="text-sm text-gray-800 font-light">
                                Giới tính: {item.gioitinh ? "Nam" : "Nữ"}
                            </p>

                        </div>
                        <div className="md:col-start-10 col-span-4 md:col-span-4 flex">
                            
                            <button
                                type="submit"
                                className="mt-3 inline-flex w-full justify-center rounded-md 
                        bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 
                        ring-inset ring-gray-200 sm:mt-0 sm:w-auto
                        hover:shadow-lg hover:border-2 hover-0 border-indigo-200 transition delay-150 duration-300 ease-in-out hover:scale-105 transform
                        "
                                onClick={() => router.push("dang-ky-lich-kham/" + item?._id)}
                            >
                                Đăng ký lịch khám
                            </button>
                            <button
                                type="submit"
                                className="mt-3 inline-flex w-full justify-center rounded-md 
                        bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 
                        ring-inset ring-gray-200 sm:mt-0 sm:w-auto
                        hover:shadow-lg hover:border-2 hover-0 border-indigo-200 transition delay-150 duration-300 ease-in-out hover:scale-105 transform
                        "
                                onClick={() => router.push("danh-sach-lich-kham/" + item?._id)}
                            >
                                Lịch sử đăng ký
                            </button>
                        </div>
                    </div>
                )}


            </div>
        </>

    );
})
export default SectionList
