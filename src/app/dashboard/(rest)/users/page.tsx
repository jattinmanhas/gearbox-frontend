import React from "react";
import { getAllProducts } from "@/lib/shop";
import { Card } from "@/components/ui/card";
import {getAllUsers} from "@/lib/auth";
import {UsersDataTable} from "@/app/dashboard/(rest)/users/UsersDatatable";
import {UsersColumns} from "@/app/dashboard/(rest)/users/UsersColums";

export default async function UsersList() {
    const allUsers = await getAllUsers();
    console.log(allUsers);
    if (allUsers.status !== 200 || allUsers.data == null) {
        allUsers.data = [];
    }

    return (
        <Card className="container w-11/12 m-auto px-4 py-4 mt-10 border">
            <h1 className="text-2xl underline underline-offset-4 mb-4">
                Users List
            </h1>
            <UsersDataTable columns={UsersColumns} data={allUsers.data} />
        </Card>
    );
}
