"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20200904134405 = void 0;
const mikro_orm_1 = require("mikro-orm");
class Migration20200904134405 extends mikro_orm_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.Migration20200904134405 = Migration20200904134405;
//# sourceMappingURL=Migration20200904134405.js.map