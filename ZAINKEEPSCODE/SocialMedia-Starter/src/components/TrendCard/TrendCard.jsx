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
    </div>
  );
}

export default TrendCard;
