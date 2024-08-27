import React from 'react';
import styles from './Stepper.module.css';
import { SVGcompletedtatus, SVGinProgressStatus, SVGnotStartedStatus } from '@/utils/images/svg';
import { StepperProps } from '@/utils/types';
import { AccordionTnaStatus } from '@/utils/constant';

const getStatusIcon = (status: string) => {
  switch (status) {
    case AccordionTnaStatus.COMPLETED:
      return SVGcompletedtatus.active;
    case AccordionTnaStatus.INPROGRESS:
      return SVGinProgressStatus.active;
    default:
      return SVGnotStartedStatus.active;
  }
};

const getConnectorStyle = (status: string) => {
  switch (status) {
    case AccordionTnaStatus.COMPLETED:
      return styles.completedConnector;
    case AccordionTnaStatus.INPROGRESS:
      return styles.InprogressConnector;
    case AccordionTnaStatus.NOTSTARTED:
      return styles.openConnector;
    default:
      return '';
  }
};

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  return (
    <div className={`${styles.stepper} flex flex-col justify-around pl-6 py-6`}>
      {steps.map((step, index) => (
        <div className={styles.step} key={index}>
          <div className={styles.stepMarker}>
            {getStatusIcon(step.status)}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`${styles.connector} ${getConnectorStyle(steps[index + 1].status)}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};



// const Stepper: React.FC<StepperProps> = ({ steps }) => {
//     return (
//       <div className="flex flex-col justify-around pl-6 py-6">
//         {steps.map((step, index) => (
//           <div className="flex flex-col items-center relative" key={index}>
//             <div
//               className={`flex items-center justify-center w-7 h-7 bg-white rounded-full  ${
//                 step.status === AccordionTnaStatus.COMPLETED
//                   ? 'bg-[#00041a] border-[#3f51b5]'
//                   : 'border-transparent'
//               } z-10`}
//             >
//               {getStatusIcon(step.status)}
//             </div>
//             {index < steps.length - 1 && (
//               <div
//                 className={`absolute top-7 left-1/2 w-0.5 h-[97px] ${getConnectorStyle(steps[index + 1].status)} transform -translate-x-1/2 z-0`}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };
export default Stepper;
