"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Pages = _interopRequireDefault(require("../schemas/Pages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PagesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getMongoRepository)(_Pages.default);
  }

  async getDetails(siteID) {
    const query = await this.ormRepository.findAndCount({
      where: {
        siteID
      }
    });
    const pages = query[1];
    let descriptions = 0;
    query[0].map(page => page.description && descriptions++);
    let keywords = 0;
    query[0].map(page => page.keywords && page.keywords.map(() => keywords++));
    return {
      pages,
      descriptions,
      keywords
    };
  }

  async create(data) {
    const page = this.ormRepository.create(data);
    await this.ormRepository.save(page);
    return page;
  }

  async search(siteID, search) {
    const pages = await this.ormRepository.find({
      where: {
        $and: [{
          $or: [{
            title: {
              $regex: search,
              $options: 'i'
            }
          }, {
            description: {
              $regex: search,
              $options: 'i'
            }
          }, {
            url: {
              $regex: search,
              $options: 'i'
            }
          }, {
            keywords: {
              $regex: search,
              $options: 'i'
            }
          }]
        }, {
          siteID
        }]
      }
    });
    return pages;
  }

}

exports.default = PagesRepository;