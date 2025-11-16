-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_user_key`(`user`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessions_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `clients_dni_key`(`dni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `custom_id` VARCHAR(191) NOT NULL,
    `client_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `lenderName` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `ratesPerYear` DOUBLE NOT NULL,
    `term` INTEGER NOT NULL,
    `frequency` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `loans_custom_id_key`(`custom_id`),
    UNIQUE INDEX `loans_client_id_key`(`client_id`),
    INDEX `loans_custom_id_idx`(`custom_id`),
    INDEX `loans_client_id_idx`(`client_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loans_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loan_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `installment` INTEGER NOT NULL,
    `payment_date` DATETIME(3) NOT NULL,
    `amount_paid` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `loans_details_loan_id_key`(`loan_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loans_details_payment_distribution` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loan_details_id` INTEGER NOT NULL,
    `principal_amount` DOUBLE NOT NULL,
    `interest_amount` DOUBLE NOT NULL,
    `lateinterest_amount` DOUBLE NOT NULL,
    `fees_amount` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `loans_details_payment_distribution_loan_details_id_key`(`loan_details_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loans` ADD CONSTRAINT `loans_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loans` ADD CONSTRAINT `loans_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loans_details` ADD CONSTRAINT `loans_details_loan_id_fkey` FOREIGN KEY (`loan_id`) REFERENCES `loans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loans_details` ADD CONSTRAINT `loans_details_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loans_details_payment_distribution` ADD CONSTRAINT `loans_details_payment_distribution_loan_details_id_fkey` FOREIGN KEY (`loan_details_id`) REFERENCES `loans_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
