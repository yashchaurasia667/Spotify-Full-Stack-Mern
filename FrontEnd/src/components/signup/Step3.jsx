import React, { useState } from "react";
import { Link } from "react-router-dom";

import StepCounter from "./StepCounter";

import spotify from "/spotifyBw.svg";

const Step3 = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("yyyy");
  const [month, setMonth] = useState("Month");
  const [gender, setGender] = useState("");

  const inputClass =
    "bg-[#121212] border border-[#727272] hover:border-[#fff] rounded-[4px] items-center focus-within:outline-none focus-within:border-white focus-within:border-[2px] px-4 py-3";
  return (
    <>
      <div className="bg-[#121212] w-[500px] text-white min-h-screen mt-2 relative">
        <div className="bg-[#121212] flex justify-center">
          <img src={spotify} alt="Spofity logo" />
        </div>
        <StepCounter stepNo={2} stepName="Tell us about yourself" />
        <div className="px-[95px]">
          <form className="grid grid-rows-3">
            <div className="text-sm font-semibold mt-3 w-[325px]">
              <p>Name</p>
              <p className="font-medium text-[13px] text-[#a7a7a7] mb-2">
                This name will appear on your profile
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass + " w-[100%]"}
              />
            </div>

            <div className="text-sm font-semibold">
              <p>Date of birth</p>
              <p className="font-medium text-[13px] text-[#a7a7a7] mb-2">
                Why do we need your date of birth?{" "}
                <Link to="/signup" className="decoration underline">
                  Learn more.
                </Link>
              </p>

              <div className="flex gap-x-2">
                <input
                  type="number"
                  value={year}
                  placeholder="YYYY"
                  onChange={(e) => setYear(e.target.value)}
                  className={inputClass + " w-[95px] number"}
                />
                <select
                  className={inputClass + " w-[150px]"}
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="January">January</option>
                  <option value="Feburary">Feburary</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>

                <input
                  type="number"
                  placeholder="dd"
                  className={inputClass + " number w-[65px]"}
                />
              </div>
            </div>

            <div className="text-sm font-semibold mt-3">
              <p>Gender</p>
              <p className="font-medium text-[13px] text-[#a7a7a7] mb-2">
                We use your gender to help personalise our content
                recommendations and ads for you.
              </p>
              <div className="text-[17px] flex flex-wrap gap-x-6 font-normal">
                <label className="flex gap-x-3">
                  <input
                    type="radio"
                    value={"Man"}
                    checked={gender === "Man"}
                    onChange={(e) => setGender(e.target.value)}
                    className="scale-125 bg-[#121212]"
                  />
                  <span>Man</span>
                </label>
                <label className="flex gap-x-3">
                  <input
                    type="radio"
                    value={"Woman"}
                    checked={gender === "Woman"}
                    onChange={(e) => setGender(e.target.value)}
                    className="scale-125 bg-[#121212]"
                  />
                  <span>Woman</span>
                </label>
                <label className="flex gap-x-3">
                  <input
                    type="radio"
                    value={"Non-binary"}
                    checked={gender === "Non-binary"}
                    onChange={(e) => setGender(e.target.value)}
                    className="scale-125 bg-[#121212]"
                  />
                  <span>Non-binary</span>
                </label>
                <label className="flex gap-x-3">
                  <input
                    type="radio"
                    value={"Something else"}
                    checked={gender === "Something else"}
                    onChange={(e) => setGender(e.target.value)}
                    className="scale-125 bg-[#121212]"
                  />
                  <span>Something else</span>
                </label>
                <label className="flex gap-x-3">
                  <input
                    type="radio"
                    value={"Prefer not to say"}
                    checked={gender === "Prefer not to say"}
                    onChange={(e) => setGender(e.target.value)}
                    className="scale-125"
                  />
                  <span>Prefer not to say</span>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Step3;
