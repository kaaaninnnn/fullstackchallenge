import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../config";
import Modal from "../components/Modal";

function CarInfo() {
  const [car, setCar] = useState({});
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios
        .get(config.api_path + "/car/list/")
        .then((res) => {
          if (res.data.message === "success") {
            setCars(res.data.results);
          }
        })
        .catch((err) => {
          throw err.response.data;
        });
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const handleSave = async () => {
    try {
      let url = "/car/insert";

      if (car.id !== undefined) {
        url = "/car/edit";
      }

      await axios
        .post(config.api_path + url, car)
        .then((res) => {
          if (res.data.message === "success") {
            Swal.fire({
              title: "Save",
              text: "Saved",
              icon: "success",
              timer: 2000,
            });

            handleClose();
            fetchData();
          }
        })
        .catch((err) => {
          throw err.response.data;
        });
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const handleClose = () => {
    const btns = document.getElementsByClassName("btnClose");
    for (let i = 0; i < btns.length; i++) {
      btns[i].click();
    }
  };

  const clearForm = () => {
    setCar({
      number: "",
      brand: "",
      model: "",
      note: "",
      etc: "",
    });
  };

  const handleDelete = (item) => {
    try {
      Swal.fire({
        title: "ยืนยันการลบ",
        text: "โปรดยืนยันการลบ",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      }).then(async (res) => {
        if (res.isConfirmed) {
          await axios
            .delete(config.api_path + "/car/delete/" + item.id)
            .then((res) => {
              if (res.data.message === "success") {
                Swal.fire({
                  title: "ลบข้อมูล",
                  text: "ลบข้อมูลเรียบร้อยแล้ว",
                  icon: "success",
                  timer: 2000,
                });
                fetchData();
              }
            })
            .catch((err) => {
              throw err.response.data;
            });
        }
      });
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-title text-center fs-3">
            ข้อมูลรถยนต์ของ บริษัท ฮ้อปคาร์ จำกัด
          </div>
        </div>
        <div className="card-body">
          <button onClick={clearForm} data-bs-toggle="modal" data-bs-target="#modalCarInfo" className="btn btn-primary">
            Add list
          </button>

          <table className="mt-3 table table-bordered table-striped">
            <thead>
              <tr>
                <th>ทะเบียนรถ</th>
                <th>ยี่ห้อรถ</th>
                <th>รุ่นรถ</th>
                <th>หมายเหตุ</th>
                <th>etc...</th>
              </tr>
            </thead>
            <tbody>
              {cars.length > 0
                ? cars.map((item) => (
                    <tr>
                      <td>{item.number}</td>
                      <td>{item.brand}</td>
                      <td>{item.model}</td>
                      <td>{item.note}</td>
                      <td>{item.etc}</td>
                      <td className="text-center">
                        <button onClick={(e) => setCar(item)} data-bs-toggle="modal" data-bs-target="#modalCarInfo" className="btn btn-info me-2">
                          <i className="fa fa-pencil"></i>
                        </button>
                        <button onClick={(e) => handleDelete(item)} className="btn btn-danger">
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>

      <Modal id="modalCarInfo" title="ข้อมูลรถยนต์" modalSize="modal-lg">
        <div>
          <label>ทะเบียนรถ</label>
          <input value={car.number} onChange={(e) => setCar({ ...car, number: e.target.value })} className="form-control" />
        </div>
        <div className="mt-2">
          <label>ยี่ห้อรถ</label>
          <input value={car.brand} onChange={(e) => setCar({ ...car, brand: e.target.value })} className="form-control" />
        </div>
        <div className="mt-2">
          <label>รุ่นรถ</label>
          <input value={car.model} onChange={(e) => setCar({ ...car, model: e.target.value })} className="form-control" />
        </div>
        <div className="mt-2">
          <label>หมายเหตุ</label>
          <input value={car.note} onChange={(e) => setCar({ ...car, note: e.target.value })} className="form-control" />
        </div>
        <div className="mt-2">
          <label>etc...</label>
          <input value={car.etc} onChange={(e) => setCar({ ...car, etc: e.target.value })} className="form-control" />
        </div>
        <div className="mt-3">
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
        </div>
      </Modal>
    </>
  );
}

export default CarInfo;
