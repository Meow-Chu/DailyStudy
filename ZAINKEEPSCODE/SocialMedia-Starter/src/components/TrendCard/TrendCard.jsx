import React from "react";
import "./TrendCard.css";
import { TrendData } from "../../Data/TrendData";

function TrendCard() {
  return (
    <div className="TrendCard">
      <h3>Trend for you</h3>

      {TrendData.map((trenddata, id) => {
        return (
          <div className="trend">
            <span>#{trenddata.name}</span>
            <span>{trenddata.shares}k shares</span>
          </div>
        );
      })}

      <button className="button r-button">Share</button>
    </div>
  );
}

export default TrendCard;
