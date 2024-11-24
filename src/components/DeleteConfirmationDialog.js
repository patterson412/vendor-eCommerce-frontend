import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

const DeleteConfirmationDialog = ({ onConfirm, trigger }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-md bg-white dark:bg-dark border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6">
                        <div className="h-14 w-14 rounded-full bg-red-500 flex items-center justify-center">
                            <AlertCircle className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold text-dark dark:text-white">
                            ARE YOU SURE?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-base text-gray-500 dark:text-gray-400">
                            You will not be able to undo this action if you proceed!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex gap-2 mt-6">
                        <AlertDialogCancel className="border border-blue dark:border-blue bg-white dark:bg-dark text-blue dark:text-blue hover:bg-gray-100 dark:hover:bg-gray-800 px-8">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={onConfirm}
                            className="bg-blue hover:bg-blue/90 text-white px-8"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteConfirmationDialog;