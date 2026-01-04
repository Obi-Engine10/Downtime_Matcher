import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.downtimeCodes.list.path, async (req, res) => {
    const search = req.query.search as string | undefined;
    const codes = await storage.searchDowntimeCodes(search || "");
    res.json(codes);
  });

  app.post(api.downtimeCodes.create.path, async (req, res) => {
     try {
        const input = api.downtimeCodes.create.input.parse(req.body);
        const code = await storage.createDowntimeCode(input);
        res.status(201).json(code);
      } catch (err) {
        if (err instanceof z.ZodError) {
          return res.status(400).json({
            message: err.errors[0].message,
            field: err.errors[0].path.join('.'),
          });
        }
        throw err;
      }
  });

  // Seed data
  const existing = await storage.getAllDowntimeCodes();
  if (existing.length === 0) {
    const seeds = [
      { code: "D1", description: "BAD PACKAGING MATERIALS", machine: "General", type: "Quality" },
      { code: "D2", description: "BAGGING OUT SOAP DUE TO CHANGE IN PLAN", machine: "General", type: "Operational" },
      { code: "D3", description: "BAGGING OUT BLACK SPECS ON SOAP TABLETS", machine: "General", type: "Operational" },
      { code: "D4", description: "BAGGING OUT LOW WEIGHT SOAP", machine: "General", type: "Operational" },
      { code: "D5", description: "BAGGING OUT MILLED SOAP FROM LINE TO RUN ON ANOTHER LINE", machine: "General", type: "Operational" },
      { code: "D6", description: "BAGGING OUT NOODLE PATCHES ON SOAP TABLETS", machine: "General", type: "Process" },
      { code: "D7", description: "BAGGING OUT OF COLOUR SOAP", machine: "General", type: "Operational" },
      { code: "D8", description: "BAGGING OUT OF SOAP FROM PLODDER", machine: "General", type: "Operational" },
      { code: "D9", description: "BAGGING OUT OFF COLOUR TABLETS DUE TO OFF COLOUR NOODLE", machine: "General", type: "Process" },
      { code: "D10", description: "BAGGING OUT SOAP DUE TO WHITE SPEC ON SOAP TABLET", machine: "General", type: "Quality" },
      { code: "D11", description: "STAMPER CHANGE OF KINETICS", machine: "Stamper", type: "Mechanical" },
      { code: "D12", description: "CHANGE OF LINE ELECTRONIC CUTTER", machine: "Cutter", type: "Instrument" },
      { code: "D13", description: "CHANGE OF PLODDER GEAR BOX", machine: "Plodder", type: "Mechanical" },
      { code: "D14", description: "CHANGING OF WRAPPER", machine: "General", type: "Operational" },
      { code: "D15", description: "CUTTER ARM BROKEN", machine: "Cutter", type: "Mechanical" },
      { code: "D16", description: "CUTTER BASE DISCHARGE BELT CUT", machine: "Cutter", type: "Mechanical" },
      { code: "D17", description: "CUTTER BILLET ROLLER GUARD SPRING CUT", machine: "Cutter", type: "Mechanical" },
      { code: "D18", description: "WRONG SILO NOODLE TRANSFER", machine: "General", type: "Operational" },
      { code: "D19", description: "CUTTER COILING SOAP", machine: "Cutter", type: "Mechanical" },
      { code: "D20", description: "REPACKING OF FINISHED PRODUCT TO ORIGINAL OUTER", machine: "General", type: "Operational" },
      { code: "D21", description: "SUNDAY STOCK-TAKING", machine: "General", type: "Operational" },
      { code: "D22", description: "CUTTER CUTTING IN REVERSE MODE", machine: "Cutter", type: "Instrument" },
      { code: "D23", description: "CUTTER DISCHARGE BASE BELT CHANGED", machine: "Cutter", type: "Mechanical" },
      { code: "D24", description: "CUTTER DISCHARGE BELT CUT", machine: "Cutter", type: "Mechanical" },
      { code: "D25", description: "CUTTER DISCHARGE BELT ROLLER BEARING BROKEN", machine: "Cutter", type: "Mechanical" },
      { code: "D26", description: "CUTTER DISCHARGE BELT ROLLER WORKLOOSED", machine: "Cutter", type: "Mechanical" },
      { code: "D27", description: "CUTTER DISCHARGE BELT SIDE TRACKED", machine: "Cutter", type: "Mechanical" },
      { code: "D28", description: "CUTTER DISCHARGE BELT WORK LOOSE", machine: "Cutter", type: "Mechanical" },
      { code: "D29", description: "CUTTER DISCHARGE MOTOR FAULTY", machine: "Cutter", type: "Mechanical" },
      { code: "D30", description: "CUTTER EMERGENCY SWITCH BOTTON FAILED", machine: "Cutter", type: "Instrument" },
      { code: "D31", description: "CUTTER ENCODER FAULTY", machine: "Cutter", type: "Instrument" },
      { code: "D32", description: "CUTTER GRIPPER HOLDER FAULTY", machine: "Cutter", type: "Mechanical" },
      { code: "D33", description: "CUTTER INTERMITTENTLY TRIPPING OFF", machine: "Cutter", type: "Mechanical" },
      { code: "D34", description: "CUTTER JAMMING AND COILING SOAP", machine: "Cutter", type: "Mechanical" },
      { code: "D35", description: "CUTTER JAMMING SOAP", machine: "Cutter", type: "Mechanical" },
      { code: "D36", description: "CUTTER KNIFE ARM BEARING BROKEN", machine: "Cutter", type: "Mechanical" },
      { code: "D37", description: "CUTTER KNIFE BLADE BROKEN", machine: "Cutter", type: "Mechanical" },
      { code: "D38", description: "CUTTER KNIFE STURD WORK-LOOSED", machine: "Cutter", type: "Mechanical" },
      { code: "D39", description: "CUTTER LANE A ARM WORKLOOSED", machine: "Cutter", type: "Mechanical" },
      { code: "D40", description: "CUTTER LANE A ENCODER BASE BROKE", machine: "Cutter", type: "Mechanical" },
      { code: "D41", description: "CUTTER LANE A NOT STARTING", machine: "Cutter", type: "Instrument" },
      { code: "D42", description: "CUTTER LANE A PRINTING OFF ALIGNMEMT / MISALIGNMENT", machine: "Cutter", type: "Mechanical" },
      { code: "D43", description: "CUTTER LANE A SOAP JAM / COILING", machine: "Cutter", type: "Mechanical" },
      { code: "D44", description: "CUTTER LANE A TRIPPING OFF", machine: "Cutter", type: "Mechanical" },
      { code: "D45", description: "CUTTER LANE B GEAR BOX FAULTY", machine: "Cutter", type: "Mechanical" },
      { code: "D46", description: "CUTTER LANE B NOT STARTING", machine: "Cutter", type: "Instrument" },
      { code: "D47", description: "CUTTER LANE B PRINTING OFF ALIGNMEMT / MISALIGNMENT", machine: "Cutter", type: "Mechanical" },
      { code: "D48", description: "CUTTER LANE B SOAP JAM / COILING", machine: "Cutter", type: "Mechanical" },
      { code: "D49", description: "CUTTER LANE B TRIPPING OFF", machine: "Cutter", type: "Mechanical" },
      { code: "D50", description: "CUTTER LINKER CONVEYOR FAULTY", machine: "Cutter", type: "Instrument" },
      { code: "D51", description: "CUTTER MAIN POWER SUPPLY PANEL BURNT", machine: "Cutter", type: "Instrument" },
      { code: "D52", description: "CUTTER OFF ALIGNMENT", machine: "Cutter", type: "Mechanical" },
      { code: "D53", description: "CUTTER OUT OF TIMING", machine: "Cutter", type: "Instrument" },
      { code: "D54", description: "CUTTER POOR BILLET CUTTING", machine: "Cutter", type: "Mechanical" },
      { code: "D55", description: "CUTTER POWER CONTROL FAULTY", machine: "Cutter", type: "Electrical" },
      { code: "D56", description: "CUTTER POWER FAILURE", machine: "Cutter", type: "Electrical" },
      { code: "D57", description: "WROKLOOSED CUTTER GUIDE FIXED BACK", machine: "Cutter", type: "Mechanical" },
      { code: "D58", description: "CUTTER ROLLER WORK LOOSE", machine: "Cutter", type: "Mechanical" },
      { code: "D59", description: "CUTTER SCRAP RETURN CONVEYOR GEAR BOX FAILED", machine: "Cutter", type: "Mechanical" },
      { code: "D60", description: "CUTTER SEPARATOR BROKEN", machine: "Cutter", type: "Mechanical" },
      { code: "D61", description: "CUTTER SERVO MOTOR FAULTY", machine: "Cutter", type: "Instrument" },
      { code: "D62", description: "CUTTER SOAP DISCHARGE GUIDE WORK-LOOSED", machine: "Cutter", type: "Mechanical" },
      { code: "D63", description: "CUTTER SPRING CUT", machine: "Cutter", type: "Mechanical" },
      { code: "D64", description: "CUTTER STABLIZER NOT WORKING", machine: "Cutter", type: "Electrical" },
      { code: "D65", description: "CUTTER STUD BROKEN", machine: "Cutter", type: "Mechanical" },
      { code: "D66", description: "CUTTER SWERVED / SWITCH / CHANGED", machine: "Cutter", type: "Mechanical" },
      { code: "D67", description: "CUTTER TRIPPING OFF", machine: "Cutter", type: "Instrument" },
      { code: "D68", description: "CUTTER UNEQUAL LENGTH CUTTING", machine: "Cutter", type: "Instrument" },
      { code: "D69", description: "DIVERTER FAULTY", machine: "Diverter", type: "Mechanical" },
      { code: "D70", description: "EXHAUSTING SOAP IN THE SYSTEM", machine: "General", type: "Operational" },
      { code: "D71", description: "ONLINE GMP TRAINING", machine: "General", type: "Operational" },
      { code: "D72", description: "HARD PLODDING", machine: "General", type: "Operational" },
      { code: "D73", description: "HIGH CAUSTIC ON SOAP", machine: "General", type: "Process" },
      { code: "D74", description: "HIGH MOISTURE", machine: "General", type: "Process" },
      { code: "D75", description: "LACK OF AIR", machine: "General", type: "Utility" },
      { code: "D76", description: "LACK OF MANPOWER", machine: "General", type: "Operational" },
      { code: "D77", description: "LACK OF OUTERS", machine: "General", type: "Operational" },
      { code: "D78", description: "LINE MAINTANANCE", machine: "General", type: "Mechanical" },
      { code: "D79", description: "LINE ON CONVERSION", machine: "General", type: "Operational" },
      { code: "D80", description: "LINE ON TRIAL", machine: "General", type: "Quality" },
      { code: "D81", description: "LINE POWER CUTOUT", machine: "General", type: "Electrical" },
      { code: "D82", description: "LINE RUNNING ON LOW SPEED", machine: "General", type: "Mechanical" },
      { code: "D83", description: "LINE START-UP DELAY DUE TO CLEANING", machine: "General", type: "Operational" },
      { code: "D84", description: "LOAD CELL TRIAL", machine: "General", type: "Quality" },
      { code: "D85", description: "LOW AIR PRESSURE", machine: "General", type: "Utility" },
      { code: "D86", description: "LOW WEIGHT SOAP", machine: "General", type: "Operational" },
      { code: "D87", description: "MACHINES ON SETTING DUE TO CONVERSION", machine: "General", type: "Operational" },
      { code: "D1140", description: "BAGGING OUT SOAP DUE TO HIGH MOISTURE", machine: "General", type: "Process" },
      { code: "D1320", description: "BAD WRAPPER", machine: "Flow Wrap", type: "Quality" }
    ];
    
    for (const seed of seeds) {
      await storage.createDowntimeCode(seed);
    }
  }

  return httpServer;
}
