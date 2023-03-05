import Headline from '../../../src/models/headline.model'
import CrudController from '../crud-controller'

class HeadlinesController extends CrudController {

    protected initializeRoutes() {
        this.router.get('/', this.getAll.bind(this))
        this.router.get('/:id', this.getById.bind(this))
        this.router.delete('/:id', this.remove.bind(this))
        this.router.post('/', this.create.bind(this))
        this.router.put('/:id', this.update.bind(this))
    }

    protected getSchema(): import('mongoose').Model<any, object> {
        return Headline
    }
}

export default HeadlinesController