import "../styles/style.scss";
import $ from "jquery";

$.ajax("/api/issues").then((resp)=>{
  console.log(resp);
});