import { validateRequest } from '../../middlewares/validate-request'
import { Validator } from '../../middlewares/validator'
import Headline from '../../models/headline.model'
import CrudController from '../crud-controller'

class HeadlinesController extends CrudController {

    protected initializeRoutes() {
        this.router.get('/', this.getAll.bind(this))
        this.router.get('/pagination', this.getAllWithPagination.bind(this))
        this.router.get('/:id', this.getById.bind(this))
        this.router.delete('/:id', this.remove.bind(this))
        this.router.post('/', Validator.validateHeadline(), validateRequest, this.create.bind(this))
        this.router.put('/:id', this.update.bind(this))
    }

    protected getSchema(): import('mongoose').Model<any, object> {
        return Headline
    }
}

export default HeadlinesController