import React, { useState } from "react";
import "./style.css";

function Floor({ slots, updateSlot }) {
  return (
    <div>
      <div className="floor">
        <div className="floor-number">
          <span>Floor 1</span>
        </div>
        <div className="slots">
          {slots.map((slot) => {
            return (
              <div
                onClick={() => updateSlot(slot)}
                style={{
                  backgroundColor: slot.status ? "" : "red",
                }}
                className="slot"
                key={slot.id}>
                {slot.id}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Floor;
