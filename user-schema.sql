CREATE TABLE `management`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `comments` TEXT(200) NULL,
  `status` VARCHAR(45) NULL DEFAULT 'Active',
  PRIMARY KEY (`id`))
COMMENT = '											';

