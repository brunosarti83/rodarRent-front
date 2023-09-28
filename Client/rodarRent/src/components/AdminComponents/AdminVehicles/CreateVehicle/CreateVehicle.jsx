/* eslint-disable react/prop-types */
// Components
import Loader from "../../../Loader/Loader";
import { toast } from "react-toastify";
// hooks & libraries
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import routesHelper from "../../../../helpers/routes";
import { useDropzone } from "react-dropzone";
import loadImage from "../../../../helpers/loadImage";
import useLocations from "../../../../helpers/useLocations";
import validate from "./validateCreateVehicle";
import { BiErrorCircle } from "react-icons/bi";

const CreateVehicle = ({ onClose }) => {
  const locations = useLocations();
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [options, setOptions] = useState({}); //this could be passed by props
  const [domains, setDomains] = useState([]); // what happens if domain exists on isActive:false vehicle ??
  const [images, setImages] = useState({});
  const [thisModelImages, setThisModelImages] = useState([]);
  const [nowShowing, setNowShowing] = useState("");
  const [newVehicle, setNewVehicle] = useState({
    brand: "",
    model: "",
    domain: "",
    year: "",
    type: "",
    transmission: "",
    fuel: "",
    passengers: "",
    pricePerDay: "",
    image: "",
    LocationId: "",
  });

  const [showError, setShowError] = useState({
    brand: false,
    model: false,
    domain: false,
    year: false,
    type: false,
    transmission: false,
    fuel: false,
    passengers: false,
    pricePerDay: false,
    image: false,
    LocationId: false,
  });

  const [errors, setErrors] = useState({
    brand: "",
    model: "",
    domain: "",
    year: "",
    type: "",
    transmission: "",
    fuel: "",
    passengers: "",
    pricePerDay: "",
    image: "",
    LocationId: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${routesHelper.baseBackUrl}/vehicles`)
      .then((response) => {
        setOptions(response.data.availableFilterOptions);
        setImages(response.data.images);
        setDomains(response.data.results.map((car) => car.domain));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  const onChange = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setNewVehicle({ ...newVehicle, [prop]: value });
    setErrors(validate({ ...newVehicle, [prop]: value }, domains));
    if (prop === "model") {
      if (images[value]) {
        setThisModelImages([...images[value]]);
        setNowShowing(images[value][0]);
        setNewVehicle({ ...newVehicle, model: value, image: images[value][0] });
      } else {
        setThisModelImages([]);
        setNowShowing("");
        setNewVehicle({ ...newVehicle, model: value, image: "" });
      }
    }
  };

  // handle dropzone
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg,image/jpg,image/png,image/webp",
    maxFiles: 1,
  });

  const onUseImage = async () => {
    setLoadingImg(true);
    const secureURL = await loadImage(files[0]);
    setNowShowing(secureURL);
    setLoadingImg(false);
    setThisModelImages([secureURL, ...thisModelImages]);
    setNewVehicle({ ...newVehicle, image: secureURL });
    setErrors(validate({ ...newVehicle, image: secureURL }, domains));
  };
  const onDiscardImage = () => {
    setFiles([]);
  };
  const onNewImage = () => {
    setThisModelImages([]);
    setNowShowing("");
  };
  //////////////////////////////////////
  // handle Submit & Clear button
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    axios
      .post(`${routesHelper.baseBackUrl}/vehicles`, [newVehicle])
      .then((response) => {
        if (response.status === 200) {
          toast.success("New Vehicle Loaded");
          onClose();
          window.location.reload()
          setLoading(false)
        }
      })
      .catch(() => {
        toast.error("ERROR-Unable to load vehicle - check domain");
        setLoading(false)
      });
  };

  const hasErrors = Object.values(errors).some((error) => error !== "");
  const isFull = Object.values(newVehicle).every((input) => input !== "");

  const handleClear = (e) => {
    e.preventDefault();
    setNewVehicle({
      brand: "",
      model: "",
      domain: "",
      year: "",
      type: "",
      transmission: "",
      fuel: "",
      passengers: "",
      pricePerDay: "",
      image: "",
      LocationId: "",
    });
    setThisModelImages([]);
    setNowShowing("");
    onDiscardImage();
  };
  ///////////////////////
  // image Changer
  const handleImgNext = () => {
    setNowShowing(thisModelImages[thisModelImages.indexOf(nowShowing) + 1]);
  };
  const handleImgPrev = () => {
    setNowShowing(thisModelImages[thisModelImages.indexOf(nowShowing) - 1]);
  };
  /////////////////////

  return loading ? (
    <div className="my-auto">
      <Loader />
    </div>
  ) : (
    <div className="font-poppins text-sm px-1 dark:text-gray-100">
      <h3 className="text-lg font-semibold my-3">Load New Vehicle Details:</h3>
      <form>
        <div className="flex w-full my-2 relative">
          <label className="mr-auto">Brand:</label>
          <div className="ml-auto flex">
            {errors.brand && (
              <div
                className="ml-auto mr-2"
                onMouseEnter={() => setShowError({ ...showError, brand: true })}
                onMouseLeave={() =>
                  setShowError({ ...showError, brand: false })
                }
              >
                <BiErrorCircle className="text-red text-xl cursor-pointer" />
              </div>
            )}
            {showError.brand && (
              <div className="bg-white border border-gray-300 text-red absolute rounded-lg -bottom-14 -right-10 transform -translate-x-1/2 z-20 p-2">
                {errors.brand}
              </div>
            )}
            <input
              className="ml-auto bg-slate-100 border border-gray-200 rounded-lg dark:bg-slate-950"
              type="text"
              list="brand"
              name="brand"
              value={newVehicle.brand}
              onChange={onChange}
            />
            <datalist id="brand">
              {options?.brands?.map((brand) => {
                return <option key={brand}>{brand}</option>;
              })}
            </datalist>
          </div>
        </div>
        <div className="flex w-full my-2 relative">
          <label className="mr-auto">Model:</label>
          <div className="ml-auto flex">
            {errors.model && (
              <div
                className="ml-auto mr-2"
                onMouseEnter={() => setShowError({ ...showError, model: true })}
                onMouseLeave={() =>
                  setShowError({ ...showError, model: false })
                }
              >
                <BiErrorCircle className="text-red text-xl cursor-pointer" />
              </div>
            )}
            {showError.model && (
              <div className="bg-white border border-gray-300 text-red absolute rounded-lg -bottom-14 -right-10 transform -translate-x-1/2 z-20 p-2">
                {errors.model}
              </div>
            )}
            <input
              className="ml-auto bg-slate-100 border border-gray-200 rounded-lg dark:bg-slate-950"
              type="text"
              list="model"
              name="model"
              value={newVehicle.model}
              onChange={onChange}
            />
            <datalist id="model">
              {options?.models?.map((model) => {
                return <option key={model}>{model}</option>;
              })}
            </datalist>
          </div>
        </div>
        <div className="flex w-full my-2 relative">
          <label className="mr-auto">Domain:</label>
          <div className="ml-auto flex">
            {errors.domain && (
              <div
                className="ml-auto mr-2"
                onMouseEnter={() =>
                  setShowError({ ...showError, domain: true })
                }
                onMouseLeave={() =>
                  setShowError({ ...showError, domain: false })
                }
              >
                <BiErrorCircle className="text-red text-xl cursor-pointer" />
              </div>
            )}
            {showError.domain && (
              <div className="bg-white border border-gray-300 text-red absolute rounded-lg -bottom-14 -right-10 transform -translate-x-1/2 z-20 p-2">
                {errors.domain}
              </div>
            )}
            <input
              className="ml-auto bg-slate-100 border border-gray-200 rounded-lg dark:bg-slate-950"
              type="text"
              name="domain"
              value={newVehicle.domain}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex w-full my-2 text-center relative">
          <label className="mr-auto">Year:</label>
          <div className="ml-auto flex">
            {errors.year && (
              <div
                className="ml-auto mr-2"
                onMouseEnter={() => setShowError({ ...showError, year: true })}
                onMouseLeave={() => setShowError({ ...showError, year: false })}
              >
                <BiErrorCircle className="text-red text-xl cursor-pointer" />
              </div>
            )}
            {showError.year && (
              <div className="bg-white border border-gray-300 text-red absolute rounded-lg -bottom-14 -right-10 transform -translate-x-1/2 z-20 p-2">
                {errors.year}
              </div>
            )}
            <input
              className="ml-auto bg-slate-100 border border-gray-200 rounded-lg dark:bg-slate-950"
              type="number"
              min="1950"
              max="2023"
              name="year"
              value={newVehicle.year}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex w-full my-2 relative">
          <label className="mr-auto">Type:</label>
          <div className="ml-auto flex">
            {errors.type && (
              <div
                className="ml-auto mr-2"
                onMouseEnter={() => setShowError({ ...showError, type: true })}
                onMouseLeave={() => setShowError({ ...showError, type: false })}
              >
                <BiErrorCircle className="text-red text-xl cursor-pointer" />
              </div>
            )}
            {showError.type && (
              <div className="bg-white border border-gray-300 text-red absolute rounded-lg -bottom-14 -right-10 transform -translate-x-1/2 z-20 p-2">
                {errors.type}
              </div>
            )}
            <select
              className="ml-auto bg-slate-100 border border-gray-200 rounded-lg dark:bg-slate-950"
              id="type"
              name="type"
              value={newVehicle.type}
              onChange={onChange}
            >
              <option>{""}</option>
              {options?.types?.map((type) => {
                return (
                  <option key={type} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex w-full my-2 relative">
          <label className="mr-auto">Transmission:</label>
          <div className="ml-auto flex">
            {errors.transmission && (
              <div
                className="ml-auto mr-2"
                onMouseEnter={() =>
                  setShowError({ ...showError, transmission: true })
                }
                onMouseLeave={() =>
                  setShowError({ ...showError, transmission: false })
                }
              >
                <BiErrorCircle className="text-red text-xl cursor-pointer" />
              </div>
            )}
            {showError.transmission && (
              <div className="bg-white border border-gray-300 text-red absolute rounded-lg -bottom-14 -right-10 transform -translate-x-1/2 z-20 p-2">
                {errors.transmission}
              </div>
            )}
            <select
              className="ml-auto bg-slate-100 border border-gray-200 rounded-lg dark:bg-slate-950"
              id="transmission"
              name="transmission"
              value={newVehicle.transmission}
              onChange={onChange}
            >
              <option>{""}</option>
              {options?.transmissions?.map((trans) => {
                return (
                  <option key={trans} value={trans}>
                    {trans}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex w-full my-2 relative">
          <label className="mr-auto">Fuel Type:</label>
          <div className="ml-auto flex">
            {errors.fuel && (
              <div
                className="ml-auto mr-2"
                onMouseEnter={() => setShowError({ ...showError, fuel: true })}
                onMouseLeave={() => setShowError({ ...showError, fuel: false })}
              >
                <BiErrorCircle className="text-red text-xl cursor-pointer" />
              </div>
            )}
            {showError.fuel && (
              <div className="bg-white border border-gray-300 text-red absolute rounded-lg -bottom-14 -right-10 transform -translate-x-1/2 z-20 p-2">
                {errors.fuel}
              </div>
            )}
            <select
              className="ml-auto bg-slate-100 border border-gray-200 rounded-lg dark:bg-slate-950"
              id="fuel"
              name="fuel"
              value={newVehicle.fuel}
              onChange={onChange}
            >
              <option>{""}</option>
              {options?.fuelTypes?.map((fuel) => {
                return (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex w-full my-2 relative">
          <label className="mr-auto">Passengers:</label>
          <div className="ml-auto flex">
            {errors.passengers && (
              <div
                className="ml-auto mr-2"
                onMouseEnter={() =>
                  setShowError({ ...showError, passengers: true })
                }
                onMouseLeave={() =>
                  setShowError({ ...showError, passengers: false })
                }
              >
                <BiErrorCircle className="text-red text-xl cursor-pointer" />
              </div>
            )}
            {showError.passengers && (
              <div className="bg-white border border-gray-300 text-red absolute rounded-lg -bottom-14 -right-10 transform -translate-x-1/2 z-20 p-2">
                {errors.passengers}
              </div>
            )}
            <input
              className="ml-auto bg-slate-100 border border-gray-200 rounded-lg dark:bg-slate-950"
              type="number"
              min="2"
              max="8"
              step="1"
              name="passengers"
              value={newVehicle.passengers}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex w-full my-2 relative">
          <label className="mr-auto">Price per day:</label>
          <div className="ml-auto flex">
            {errors.pricePerDay && (
              <div
                className="ml-auto mr-2"
                onMouseEnter={() =>
                  setShowError({ ...showError, pricePerDay: true })
                }
                onMouseLeave={() =>
                  setShowError({ ...showError, pricePerDay: false })
                }
              >
                <BiErrorCircle className="text-red text-xl cursor-pointer" />
              </div>
            )}
            {showError.pricePerDay && (
              <div className="bg-white border border-gray-300 text-red absolute rounded-lg -bottom-14 -right-10 transform -translate-x-1/2 z-20 p-2">
                {errors.pricePerDay}
              </div>
            )}
            <input
              className="ml-auto bg-slate-100 border border-gray-200 text-center rounded-lg dark:bg-slate-950"
              type="number"
              min="0"
              max="1000"
              step="1"
              name="pricePerDay"
              value={newVehicle.pricePerDay}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex flex-col w-full my-2 relative">
          <label className="mr-auto mb-1 font-semibold">Location:</label>
          <div className="ml-auto flex justify-center w-full">
            {errors.LocationId && (
              <div
                className="ml-auto mr-2"
                onMouseEnter={() =>
                  setShowError({ ...showError, LocationId: true })
                }
                onMouseLeave={() =>
                  setShowError({ ...showError, LocationId: false })
                }
              >
                <BiErrorCircle className="text-red text-xl cursor-pointer" />
              </div>
            )}
            {showError.LocationId && (
              <div className="bg-white border border-gray-300 text-red absolute rounded-lg -bottom-14 -right-10 transform -translate-x-1/2 z-20 p-2">
                {errors.LocationId}
              </div>
            )}
            <select
              className="mx-auto bg-slate-100 border border-gray-200 rounded-lg text-center max-w-[500px] dark:bg-slate-950"
              id="LocationId"
              name="LocationId"
              value={newVehicle.LocationId}
              onChange={onChange}
            >
              <option>{""}</option>
              {locations?.map((loc) => {
                return (
                  <option key={loc.id} value={loc.id}>
                    {`${loc.alias} - ${loc.city}`}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="w-full rounded-lg">
          {thisModelImages.length ? (
            <div>
              <div className="w-[90%] h-[250px] rounded-lg bg-white drop-shadow-lg mx-auto text-center flex items-center relative overflow-hidden dark:bg-slate-950 dark:text-gray-100">
                <img
                  src={nowShowing}
                  alt="current vehicle image"
                  className="p-1 w-full h-full object-cover"
                />
                <div
                  className="w-[150px] text-xs p-2 border-1 rounded-lg bg-sky-100 hover:cursor-pointer absolute bottom-0 right-0"
                  onClick={onNewImage}
                >
                  Choose New Image
                </div>
              </div>
              {thisModelImages.length > 1 && (
                <div className="flex justify-center">
                  {thisModelImages.indexOf(nowShowing) <
                    thisModelImages.length - 1 && (
                    <div
                      className="py-2 px-3 rounded-lg shadow-md bg-white m-2 text-lg text-center align-center hover:cursor-pointer dark:br-slate-950 dark:text-gray-100 dark:border dark:border-gray-200"
                      onClick={handleImgNext}
                    >
                      ⇒
                    </div>
                  )}
                  {thisModelImages.indexOf(nowShowing) > 0 && (
                    <div
                      className="py-2 px-3 rounded-lg shadow-md bg-white m-2 text-lg text-center align-center hover:cursor-pointer dark:br-slate-950 dark:text-gray-100 dark:border dark:border-gray-200"
                      onClick={handleImgPrev}
                    >
                      ⇐
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="w-[85%] h-[220px] rounded-lg bg-white drop-shadow-lg mx-auto text-center flex items-center border-dashed border-4 border-gray-400 mt-4 overflow-hidden dark:bg-slate-950 dark:text-gray-100">
                  {!files.length ? (
                    isDragActive ? (
                      <p className="text-md font-bold text-gray-500 mx-4 dark:text-gray-100">
                        Drop your image file here
                      </p>
                    ) : (
                      <p className="text-md font-bold text-gray-500 mx-4 dark:text-gray-100">
                        Drag and drop image file here, or click to select file
                      </p>
                    )
                  ) : (
                    <div className="w-full flex justify-center align-middle">
                      {loadingImg ? (
                        <div className="mx-auto">
                          <Loader />
                        </div>
                      ) : (
                        <img
                          src={files[0].preview}
                          alt="preview image"
                          className="p-1 w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`flex justify-around my-1 text-center ${
                  !files.length && "hidden"
                }`}
              >
                <div
                  className={`w-[100px] p-2 border-1 rounded-lg bg-lime-300 hover:cursor-pointer ${
                    !files.length && "hidden"
                  }`}
                  onClick={onUseImage}
                >
                  Use ✔️
                </div>
                <div
                  className={`w-[100px] p-2 border-1 rounded-lg bg-rose-400 hover:cursor-pointer ${
                    !files.length && "hidden"
                  }`}
                  onClick={onDiscardImage}
                >
                  Discard ✖️
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-around">
          <div>
            <button
              onClick={handleSubmit}
              disabled={hasErrors || !isFull}
              className="bg-blue text-white h-10 px-10 mr-auto rounded-lg text-md disabled:opacity-50 disabled:cursor-not-allowed mt-3"
            >
              Accept
            </button>
          </div>
          <div>
            <button
              onClick={handleClear}
              className="bg-white text-gray-500 h-10 px-10 mr-auto rounded-lg text-md disabled:opacity-50 disabled:cursor-not-allowed mt-3 dark:bg-slate-900 dark:text-gray-100"
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateVehicle;
