// Core Components
import { Module } from "@nestjs/common";

// Controllers
import {AuthController} from "./auth.controller"

@Module({
    controllers:[AuthController]
})
export class AuthModule{}