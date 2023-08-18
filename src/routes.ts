import { Router } from 'express'
import multer from 'multer'

import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'

import { AuthUserController } from './controllers/User/AuthUserController'
import { EditUserController } from './controllers/User/EditUserController'
import { GetUserController } from './controllers/User/GetUserController'
import { CreateUserController } from './controllers/User/CreateUserController'

import { ListUsersController } from './controllers/Admin/Users/ListUsersController'
import { EditAdminUserController } from './controllers/Admin/Users/EditAdminUserController'
import { DeleteUserController } from './controllers/Admin/Users/DeleteUserController'

import { CreateGridController } from './controllers/Grid/CreateGridController'
import { EditGridController } from './controllers/Grid/EditGridController'
import { DeleteGridController } from './controllers/Grid/DeleteGridController'
import { ListGridsController } from './controllers/Grid/ListGridsController'

import { ListTablesController } from './controllers/Table/ListTablesController'
import { CreateTableController } from './controllers/Table/CreateTableController'
import { EditTableController } from './controllers/Table/EditTableController'
import { DeleteTableController } from './controllers/Table/DeleteTableController'

import { ListLeadsController } from './controllers/Lead/ListLeadsController'
import { CreateLeadController } from './controllers/Lead/CreateLeadController'
import { EditLeadController } from './controllers/Lead/EditLeadController'
import { DeleteLeadController } from './controllers/Lead/DeleteLeadController'
import { GetGridController } from './controllers/Grid/GetGridController'
import { PositionLeadController } from './controllers/Lead/PositionLeadController'
import { AuthAdminController } from './controllers/Admin/AuthAdminController'
import { PasswordForgotController } from './controllers/User/PasswordForgotController'
import { PasswordResetController } from './controllers/User/PasswordResetController'
import { PasswordVerifyResetController } from './controllers/User/PasswordVerifyResetController'
import { InviteGridController } from './controllers/InviteGrid/InviteGridController'
import { GetInviteController } from './controllers/InviteGrid/GetInviteController'
import { DeleteInviteController } from './controllers/InviteGrid/DeleteInviteController'
import { AcceptInviteController } from './controllers/InviteGrid/AcceptInviteControlleR'
import { ListChargesController } from './controllers/Charge/ListPlansController'
import { CreateChargeController } from './controllers/Charge/CreateChargeController'
import { ConfirmedChargeController } from './controllers/Charge/ConfirmedChargeController'
import { EditChargeController } from './controllers/Charge/EditChargeController'
import { DeleteChargeController } from './controllers/Charge/DeleteChargeController'
import { ListPlansController } from './controllers/Recurrence/ListPlansController'
import { CreatePlanController } from './controllers/Recurrence/CreatePlanController'
import { EditPlanController } from './controllers/Recurrence/EditPlanController'
import { DeletePlanController } from './controllers/Recurrence/DeletePlanController'
import { ListLeadsRecurrenceController } from './controllers/Recurrence/ListLeadsRecurrenceController'
import { ListRecurrencesController } from './controllers/Recurrence/ListRecurrencesController'
import { AddRecurrenceController } from './controllers/Recurrence/AddRecurrenceController'

const upload = multer(uploadConfig)

const router = Router()

// Routes Publics

router.post('/user-session', new AuthUserController().handle)
router.post('/admin-session', new AuthAdminController().handle)
router.post('/user', new CreateUserController().handle)
router.post('/password-forgot', new PasswordForgotController().handle)
router.post('/password-reset/:code', new PasswordResetController().handle)
router.get('/password-verify-reset/:code', new PasswordVerifyResetController().handle)
router.get('/invite-grid/:id', new GetInviteController().handle)

router.use(isAuthenticated)

router.get('/user/:id', new GetUserController().handle)
router.put('/user', upload.single("file"), new EditUserController().handle)
router.put('/user-admin/:id', upload.single("file"), new EditAdminUserController().handle)
router.delete('/user/:id', new DeleteUserController().handle)

router.get('/grid/:id', new GetGridController().handle)
router.get('/grids', new ListGridsController().handle)
router.post('/grid', new CreateGridController().handle)
router.put('/grid/:id', upload.single("file"), new EditGridController().handle)
router.delete('/grid/:id', new DeleteGridController().handle)

router.post('/invite-grid/:id', new InviteGridController().handle)
router.post('/accept-invite/:id', new AcceptInviteController().handle)
router.delete('/invite-grid/:id', new DeleteInviteController().handle)

router.get('/tables', new ListTablesController().handle)
router.post('/table', new CreateTableController().handle)
router.put('/table/:id', upload.single("file"), new EditTableController().handle)
router.delete('/table/:id', new DeleteTableController().handle)

router.get('/leads', new ListLeadsController().handle)
router.post('/lead', upload.single("file"), new CreateLeadController().handle)
router.put('/position-lead/:id', new PositionLeadController().handle)
router.put('/lead/:id', upload.single("file"), new EditLeadController().handle)
router.delete('/lead/:id', new DeleteLeadController().handle)

router.get('/charges', new ListChargesController().handle)
router.post('/charge', new CreateChargeController().handle)
router.get('/confirmed-charge/:id', new ConfirmedChargeController().handle)
router.put('/charge/:id',  new EditChargeController().handle)
router.delete('/charge/:id', new DeleteChargeController().handle)

router.get('/plans-recurrence', new ListPlansController().handle)
router.post('/plan-recurrence', new CreatePlanController().handle)
router.put('/plan-recurrence/:id',  new EditPlanController().handle)
router.delete('/plan-recurrence/:id', new DeletePlanController().handle)

router.get('/leads-recurrence', new ListLeadsRecurrenceController().handle)
router.get('/list-recurrence/:lead_id', new ListRecurrencesController().handle)
router.post('/add-recurrence/:lead_id', new AddRecurrenceController().handle)




router.get('/admin/users', new ListUsersController().handle)



export { router }