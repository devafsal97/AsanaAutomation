// import "./Task.css";
// import closeIcon from "../../../assets/cancel.png";

// const Task = ({ modalVisibilityHandler, selectedTask }) => {
//   const ecalationCall = ["FirstCall", "SecondCall", "ThirdCall"];
//   return (
//     <div className="modal">
//       <img
//         className="close-icon"
//         src={closeIcon}
//         alt="close icon"
//         onClick={modalVisibilityHandler}
//       ></img>
//       <div className="modal-seca">
//         <div className="modal-item-seca">
//           <h3 className="modal-h3">Id:</h3>
//           <h3 className="item-value"> {selectedTask.id}</h3>
//         </div>
//         <div className="modal-item-seca">
//           <h3 className="modal-h3">Name:</h3>
//           <h3 className="item-value"> {selectedTask.name}</h3>
//         </div>
//         <div className="modal-item-seca">
//           <h3 className="modal-h3">Created at:</h3>
//           <h3 className="item-value"> {selectedTask.created_at}</h3>
//         </div>
//         <div className="modal-item-seca">
//           <h3 className="modal-h3">Current author:</h3>
//           <h3 className="item-value"> {selectedTask.currentAuthor}</h3>
//         </div>
//         <div className="modal-item-seca">
//           <h3 className="modal-h3">Gid:</h3>
//           <h3 className="item-value"> {selectedTask.gid}</h3>
//         </div>
//       </div>
//       <div className="modal-secb">
//         <div className="modal-item sec-b-h4">
//           <h4 className="secb-title">CurrentAuthor Call Status:</h4>
//           <div className="secb-item-value">
//             <div className="modal-secb-item">
//               <h4 className="h4-width">number:</h4>
//               <h4>{selectedTask.currentAuthotCallStatus.number}</h4>
//             </div>
//             <div className="modal-secb-item">
//               <h4 className="h4-width">call status:</h4>
//               <h4>{selectedTask.currentAuthotCallStatus.callStatus}</h4>
//             </div>
//             <div className="modal-secb-item">
//               <h4 className="h4-width">called time:</h4>
//               <h4>{selectedTask.currentAuthotCallStatus.timeStamp}</h4>
//             </div>
//           </div>
//         </div>
//         <div className="modal-item sec-b-h4">
//           <h4 className="secb-title">Task Inprogress Time:</h4>
//           <h4 className="secb-item-value">{selectedTask.inProgressTime}</h4>
//         </div>
//         <div className="modal-item sec-b-h4">
//           <h4 className="secb-title">Task Completed Time:</h4>
//           <h4 className="secb-item-value">{selectedTask.taskCompletedTime}</h4>
//         </div>
//         <div className="modal-item sec-b-h4">
//           <h4 className="secb-title">Turnaround Time:</h4>
//           <h4 className="secb-item-value">{selectedTask.turnAroundTime}</h4>
//         </div>
//         <div className="modal-item sec-b-h4">
//           <h4 className="secb-title">Task Url:</h4>
//           <h4 className="secb-item-value">{selectedTask.taskUrl}</h4>
//         </div>
//         <div className="modal-item sec-b-h4">
//           <h4 className="secb-title">Escalation Process:</h4>
//           <div className="secb-item-value">
//             {selectedTask.escalationProcess.map((item, index) => (
//               <div className="escalation-call">
//                 <div className="sec-b-h4">{ecalationCall[index]}</div>
//                 <div className="modal-secb-item">
//                   <h4 className="h4-width">number:</h4>
//                   <h4>{item.number}</h4>
//                 </div>
//                 <div className="modal-secb-item">
//                   <h4 className="h4-width">call status:</h4>
//                   <h4>{item.callStatus}</h4>
//                 </div>
//                 <div className="modal-secb-item">
//                   <h4 className="h4-width">called time:</h4>
//                   <h4>{item.timeStamp}</h4>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Task;
