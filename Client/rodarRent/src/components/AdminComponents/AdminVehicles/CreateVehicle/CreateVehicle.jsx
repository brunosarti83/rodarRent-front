// Components
import Loader from "../../../Loader/Loader";
// hooks & libraries
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "../../../../helpers/routes";
import { useDropzone } from "react-dropzone";
import loadImage from "../../../../helpers/loadImage";
import useLocations from "../../../../helpers/useLocations";

const CreateVehicle = () => {
  const locations = useLocations();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({}); //this could be a custom hook - leave for later
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/vehicles`)
      .then((response) => {
        setOptions(response.data.availableFilterOptions);
        setImages(response.data.images);
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
    const secureURL = await loadImage(files[0]);
    setNowShowing(secureURL);
    setThisModelImages([secureURL, ...thisModelImages]);
    setNewVehicle({ ...newVehicle, image: secureURL });
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
    axios
      .post(`${API_BASE_URL}/vehicles`, [newVehicle])
      .then(() => {
        window.alert("New Vehicle Loaded"); // change to Toast
      })
      .catch((err) => {
        console.log(err); // change to Toast
        console.log(newVehicle);
      });
  };
  const disable = false;

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
    <div className="font-poppins text-sm px-1">
      <h3 className="text-lg font-semibold my-3">Load New Vehicle Details:</h3>
      {/* this should be a Form with a Submmit and validations */}
      <form>
        <div className="flex w-full my-2">
          <label className="mr-auto">Brand:</label>
          <input
            className="ml-auto bg-slate-100 dark:bg-slate-950"
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
        <div className="flex w-full my-2">
          <label className="mr-auto">Model:</label>
          <input
            className="ml-auto bg-slate-100"
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
        <div className="flex w-full my-2">
          <label className="mr-auto">Domain:</label>
          <input
            className="ml-auto bg-slate-100"
            type="text"
            name="domain"
            value={newVehicle.domain}
            onChange={onChange}
          />
        </div>
        <div className="flex w-full my-2 text-center">
          <label className="mr-auto">Year:</label>
          <input
            className="ml-auto bg-slate-100"
            type="number"
            min="1950"
            max="2023"
            name="year"
            value={newVehicle.year}
            onChange={onChange}
          />
        </div>
        <div className="flex w-full my-2">
          <label className="mr-auto">Type:</label>
          <select
            className="ml-auto bg-slate-100"
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
        <div className="flex w-full my-2">
          <label className="mr-auto">Transmission:</label>
          <select
            className="ml-auto bg-slate-100"
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
        <div className="flex w-full my-2">
          <label className="mr-auto">Fuel Type:</label>
          <select
            className="ml-auto bg-slate-100"
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
        <div className="flex w-full my-2">
          <label className="mr-auto">Passengers:</label>
          <input
            className="ml-auto bg-slate-100 text-center"
            type="number"
            min="2"
            max="16"
            step="1"
            name="passengers"
            value={newVehicle.passengers}
            onChange={onChange}
          />
        </div>
        <div className="flex w-full my-2">
          <label className="mr-auto">Price per day:</label>
          <input
            className="ml-auto bg-slate-100 text-center"
            type="number"
            min="0"
            max="1000"
            step="1"
            name="pricePerDay"
            value={newVehicle.pricePerDay}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col w-full my-2">
          <label className="mr-auto mb-1 font-semibold">Location:</label>
          <select
            className="mx-auto bg-slate-100 text-center max-w-[500px]"
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
        <div className="w-full rounded-lg">
          {thisModelImages.length ? (
            <div>
              <div className="w-[90%] h-[250px] rounded-lg bg-white drop-shadow-lg mx-auto text-center flex items-center relative">
                <img
                  src={nowShowing}
                  alt="current vehicle image"
                  className="p-1"
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
                      className="py-2 px-3 rounded-lg shadow-md bg-white m-2 text-lg text-center align-center hover:cursor-pointer"
                      onClick={handleImgNext}
                    >
                      ⇒
                    </div>
                  )}
                  {thisModelImages.indexOf(nowShowing) > 0 && (
                    <div
                      className="py-2 px-3 rounded-lg shadow-md bg-white m-2 text-lg text-center align-center hover:cursor-pointer"
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
                <div className="w-[85%] h-[220px] rounded-lg bg-white drop-shadow-lg mx-auto text-center flex items-center border-dashed border-4 border-gray-400 mt-4">
                  {!files.length ? (
                    isDragActive ? (
                      <p className="text-md font-bold text-gray-500 mx-4">
                        Drop your image file here
                      </p>
                    ) : (
                      <p className="text-md font-bold text-gray-500 mx-4">
                        Drag and drop image file here, or click to select file
                      </p>
                    )
                  ) : (
                    <div className="p-2">
                      <img
                        src={files[0].preview}
                        alt="preview image"
                        className="p-1"
                      />
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
              disabled={disable}
              className="bg-blue text-white h-10 px-10 mr-auto rounded-lg text-md disabled:opacity-50 disabled:cursor-not-allowed mt-3"
            >
              Accept
            </button>
          </div>
          <div>
            <button
              onClick={handleClear}
              disabled={disable}
              className="bg-white text-gray-500 h-10 px-10 mr-auto rounded-lg text-md disabled:opacity-50 disabled:cursor-not-allowed mt-3"
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
// missing Vehicle initial LocationId
export default CreateVehicle;
