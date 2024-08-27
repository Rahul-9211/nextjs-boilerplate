"use client";

import React,  { useState, useEffect, useCallback } from "react";
import AnimatedButton from "../buttons/AnimatedLiquidButton";
import Stepper from "../Stepper/Stepper";
import {
  SVGaccordionDownArrow,
  SVGaccordionUpArrow,
  SVGcompletedtatus,
  SVGinProgressStatus,
  SVGnotStartedStatus
} from "@/utils/images/svg";
import { AccordianSubStage, AccordionProps } from "@/utils/types";
import { toNormalString } from "@/utils/functions/function";
import { OrderStatus, progressStatus } from "@/utils/constant";

const Accordion = ({ id, ele }: AccordionProps) => {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  useEffect(() => {
    setAccordionOpen(false);
  }, []);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setAccordionOpen(prev => !prev);
  }, []);

  const {
    status,
    stage,
    producedQuantity,
    totalQuantity,
    subStages
  } = ele;

  const statusIcon = status === progressStatus.COMPLETED
    ? SVGcompletedtatus.active
    : status === progressStatus.INPROGRESS
    ? SVGinProgressStatus.active
    : SVGnotStartedStatus.active;

  return (
    <div className="py-2 bg-white p-4 rounded-2xl font-workSans mb-4 cursor-pointer">
      <div>
        <div
          className="flex items-center justify-between w-full text-left font-semibold py-2"
          onClick={handleToggle}
          aria-expanded={accordionOpen}
          aria-controls={`accordion-text-${id}`}
        >
          <div className="flex items-center">
            <div className="pr-4">{statusIcon}</div>
            <h3 className="text-sm text-neutral-2 font-normal">
              {toNormalString(stage)}
            </h3>
          </div>
          <div className="flex items-center">
            {producedQuantity !== undefined && (
              <div className="px-4 py-2.5 text-sm text-neutral-4 font-normal border-[1px] border-neutral-9 rounded-lg">
                <span className="text-neutral-2 font-bold">{producedQuantity}</span>
                /<span className="font-medium">{totalQuantity}</span> Units Produced
              </div>
            )}
            <div className="px-4">
            {status == progressStatus.INPROGRESS && (
                      <AnimatedButton status="In-Progress" />
                    )}
                    {status == progressStatus.NOTSTARTED && (
                      <button className="p-2 bg-neutral-9.5  font-normal text-sm border-[1px] border-neutral-8 text-neutral-4 rounded-lg">
                        {status}
                      </button>
                    )}
                    {status == progressStatus.COMPLETED && (
                      <button className="p-2 bg-success-8  font-normal  text-sm border-[1px] border-success-4 text-success-3 rounded-lg">
                        {status}
                      </button>
                    )}
                     {!status  &&  <button className="p-2 bg-neutral-9.5  font-normal text-sm border-[1px] border-neutral-8 text-neutral-4 rounded-lg">
                        {progressStatus.NOTSTARTED}
                      </button>}
                   
                        
            </div>
            <div>
              {accordionOpen
                ? SVGaccordionUpArrow.active
                : SVGaccordionDownArrow.active}
            </div>
          </div>
        </div>
      </div>
      <div
        id={`accordion-text-${id}`}
        role="region"
        aria-labelledby={`accordion-title-${id}`}
        className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
          accordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="flex   overflow-y-auto">
          <Stepper steps={subStages} />
          <div className="py-6 pr-6 w-full">
            <ol className="space-y-4">
              {subStages?.map((item : AccordianSubStage, index : number) => (
                <li className="ms-6 items-center justify-center" key={item.seq}>
                  <div className="p-4 bg-primary-9.8 rounded-lg pr-6">
                    <h3 className="text-neutral-4 text-sm font-normal">
                      {item.seq}. {item.displayText}
                    </h3>
                    <div className="flex justify-between items-center pt-5">
                      <div>
                      {item?.status == progressStatus.INPROGRESS && (
                      <AnimatedButton status="In-Progress" />
                    )}
                    {item?.status == progressStatus.NOTSTARTED && (
                      <button className="p-2 bg-neutral-9.5 border-[1px] border-neutral-8 text-neutral-4 rounded-lg">
                        {item?.status}
                      </button>
                    )}
                    {item?.status == progressStatus.COMPLETED && (
                      <button className="p-2 bg-success-8  border-[1px] border-success-4 text-success-3 rounded-lg">
                        {item?.status}
                      </button>
                    )}
                    {item?.status == "-" && <span>-</span>}
                        
                      </div>
                      <div>
                        <p className="text-neutral-6 text-xs uppercase pb-1">
                          Expected Date
                        </p>
                        <p className="text-neutral-4 text-sm">
                          {item.expectedDate ? item.expectedDate : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-6 text-xs uppercase pb-1">
                          ACTUAL DATE
                        </p>
                        <p className="text-neutral-4 text-sm">
                          {item.actualDate ? item.actualDate : "-"}
                        </p>
                      </div>
                      <div className={`${ item.delay?.displayText == OrderStatus.DELAYED
                        ? "text-error-4"
                        : "text-success-3"}`}>
                        {item.delay?.displayText ? item.delay?.displayText : "-"} <br />
                        <span className={`text-neutral-4`}>{item.delay?.daysOfDelay ? item.delay?.daysOfDelay + " days " : ""}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Accordion);
