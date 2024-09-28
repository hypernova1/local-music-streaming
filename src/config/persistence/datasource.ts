import { DataSource } from "typeorm";
import { typeormConfig } from "./ormconfig";

export default new DataSource(typeormConfig)