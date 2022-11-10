import { Request, Response } from "express";
import {users} from '../models/User';
import {People} from "../models/People";
import jwt  from "jsonwebtoken";

export const signup = async (req: Request, res: Response) =>{
    const {mailUser, passwordUser, UserNick, idPeople, personName, personBirthDate, gender} = req.body;
    const user = new users();
    user.mailUser = mailUser;
    if(req.body.passwordUser){
        user.passwordUser = await user.encryptPassword(passwordUser);
    }
    user.UserNick = UserNick;
    user.idPeople = idPeople;

    await user.save();
    const token: string = jwt.sign({id: user.id}, process.env.TOKEN_SECRET || 'tokentest');
    res.header('auth_token', token).json(user);

    const people = new People();
    people.personName = personName;
    people.personBirthDate = personBirthDate;
    people.gender = gender;

    await people.save();
}

export const signin = async(req: Request, res: Response) =>{
    try {
        if(req.body.mailUser && req.body.passwordUser){
            const user = await users.findOneBy({mailUser: req.body.mailUser});
            if(!user) return res.status(400).json('Email or password is wrong');
            const correctPassword: boolean = await user.validatePassword(req.body.passwordUser);
            const token: string = jwt.sign({id: user.id}, process.env.TOKEN_SECRET || 'tokentest', {
                expiresIn: 60* 60* 24
            });
            res.header('auth_token', token).json(user);
        }
       
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({message: error.message});
        }
        
    }
}

export const profile = async (req: Request, res: Response) =>{
    const user = await users.findOneBy({id: parseInt(req.userId)});
    if(!user) return res.status(400).json('No user found');
    res.json(user);
}