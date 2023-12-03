const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { mongoConnection } = require("../mongo");

// type ChartType = "timeseries" | "lineseries";

// interface GridPos {
//   x: number;
//   y: number;
//   w: number;
//   h: number;
// }

// interface Panel {
//   id: string;
//   type: ChartType;d
//   title: string;
//   gridPos: GridPos;
// }

const dashboardSchema = new mongoose.Schema({
  owner: {
    type: Array,
    required: true
  },
  title: String,
  description: String,
  tags: String,
  panels: {
    type: [Object],
    required: true,
    validate: {
      validator: function (value) {
        return (
          Array.isArray(value) &&
          value.every((panel) => {
            return (
              (typeof panel.id === "string" && panel.type === "timeseries") ||
              (panel.type === "lineseries" &&
                typeof panel.title === "string" &&
                typeof panel.gridPos === "object" &&
                typeof panel.gridPos.x === "number" &&
                typeof panel.gridPos.y === "number" &&
                typeof panel.gridPos.w === "number" &&
                typeof panel.gridPos.h === "number")
            );
          })
        );
      },
      message: "Invalid panels array",
    },
  },
});

dashboardSchema.pre('save', (next) => {
  if (!this.tags) {
    this.tags = ""
  }
  if (!this.description) {
    this.description = 'No Description'
  }
  if(!this.panels){
    this.panels = []
  }
  next()
})

dashboardSchema.plugin(mongoosePaginate);

const Dashboard = mongoConnection.model("Dashboard", dashboardSchema);

module.exports = {
  Dashboard,
};
