import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QRCode from "qrcode.react";

const SectionList = React.forwardRef(function SectionTPHS(props: Props, ref) {
    const [data, setData] = useState([])
    const router = useRouter()
    const [thongTinHoSo, setThongTinHoSo] = useState<any>([]);
    const url = "http://localhost:5000/api/thongtinbenhnhan/" + router.query.id;

    const getData = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.get(
            'http://localhost:5000/api/datlichkham/theohoso/' + router.query.id
        );
        setData(res.data)
    }
    console.log(data);
    useEffect(() => {

        if (router.query.id) {
            getData()
        }
    }, [router.query.id])
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
    const fetchInfo = () => {
        return axios.get(url).then((res) => setThongTinHoSo(res.data));
    };
    useEffect(() => {
        if (router.query.id) {
            fetchInfo();
        }
    }, [router.query.id]);
    React.useImperativeHandle(ref, () => ({
        getData
    }))

    return (
        <>
            <div className="w-full flex flex-col gap-4 h-screen">
                <>
                    <div>
                        <text className="block text-sm font-medium leading-6 text-gray-900 mb-2">Họ tên: {
                            thongTinHoSo?.hoten
                        }</text>
                        <text className="block text-sm font-medium leading-6 text-gray-900 mb-2">Giới tính: {
                            thongTinHoSo?.gioitinh ? 'Nam' : "Nữ"}</text>
                        <text className="block text-sm font-medium leading-6 text-gray-900 mb-2">Ngày sinh: {
                            formatDate(new Date(thongTinHoSo?.ngaysinh))
                        } </text>
                        <text className="block text-sm font-medium leading-6 text-gray-900 mb-2">Địa chỉ: {
                            thongTinHoSo?.diachi
                        } </text>

                    </div>

                    {data?.map((item: any) =>
                        <div
                            className="rounded-sm w-full grid grid-cols-12 bg-white shadow p-3 gap-2 items-center 
                        hover:shadow-lg hover:border-2 hover-0 border-indigo-200 transition delay-150 duration-300 ease-in-out hover:scale-105 transform"

                        >
                            <div className="col-span-12 md:col-span-2">
                                <QRCode
                                    value={item?._id}
                                    size={100}
                                    level={"H"}
                                    includeMargin={true}
                                />
                            </div>
                            {/* Title */}
                            <div className="col-span-9 xl:-ml-5">

                                <p className="text-sm text-gray-800 font-light">
                                    Thẻ BHYT: {item.theBHYT}
                                </p>
                                <p className="text-sm text-gray-800 font-light">
                                    Chuyên khoa: {item.tenchuyenkhoa}
                                </p>
                                <p className="text-sm text-gray-800 font-light">
                                    Phòng khám: {item.tenphongkham}
                                </p>
                                <p className="text-sm text-gray-800 font-light">
                                    Ngày khám: {item.tenkhunggiokham} ngày {formatDate(new Date(item.ngaykham))}
                                </p>
                                <p className="text-sm text-gray-800 font-light">
                                    Triệu chứng: {item.trieuchung}
                                </p>
                                <p className="text-sm text-gray-800 font-light">
                                    Tổng tiền: 110.000 VNĐ
                                </p>
                            </div>
                            <div className="col-span-1">
                                <img src="/cho.png" alt="" className="w-10 h-10" />
                            </div>
                        </div>
                    )}

                </>
            </div>
        </>

    );
})
export default SectionList
