import { Router } from "express";
import {
  addEmployee,
  addTransaction,
  getOutstandingReport,
  getEmployeeReport,
} from '../controllers/employee.controllers.js';
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router()

router.route('/add').post(verifyJWT,addEmployee);
router.route('/transaction').post(verifyJWT,addTransaction);
router.route('/outstanding').get(verifyJWT,getOutstandingReport);
router.route('/report/:employeeId').get(verifyJWT,getEmployeeReport);

export default router;
