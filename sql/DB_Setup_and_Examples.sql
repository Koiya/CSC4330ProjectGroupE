drop database TutoringSystem;
create database if not exists TutoringSystem;
use TutoringSystem;

create table AccountInfo(
	id int not null auto_increment,
    email varchar(100) not null,
    account_password varchar(100) not null, -- hash this somehow
    primary key(id)
);

create table ProfileInfo(
	id int,
    role varchar(10) default "student", -- tutor, admin, student
    first_name varchar(30),
    last_name varchar(30),
    description varchar(400) default null,
    primary key(id),
    foreign key(id) references AccountInfo(id)
);

create table Appointments( -- functionally similar to messages.
	student_id int not null,
    tutor_id   int not null,
    appointment_time time,
    appointment_subject varchar(30),
    foreign key(student_id) references AccountInfo(id),
    foreign key(tutor_id) references AccountInfo(id)
);

create table Messages(
	sender_id int not null,
    receiver_id int not null,
    message_type varchar(10) not null, -- yes, no, request
    message_time time,
    message varchar(240) default null,
    foreign key(sender_id)   references AccountInfo(id),
    foreign key(receiver_id) references AccountInfo(id)
);

-- CREATE AN ACCOUNT int function NewAccount(email, (password)) returns SELECT LAST_INSERT_ID();
insert into AccountInfo values(null, "tgeor13@lsu.edu", "123m2h4qgrf34142QR#!@$2r333rf1340cefe!#$QFe3124QF"); -- 1
insert into ProfileInfo values((SELECT LAST_INSERT_ID() as id), null, null, null, null); -- INITIALIZE PROFILE

insert into AccountInfo values(null, "SUSSY2@lsu.edu", "123m2h4qgrf34142QR#!@$2r333rf1340cefe!#$QFe3124QF"); -- 1
insert into ProfileInfo values((SELECT LAST_INSERT_ID() as id), null, null, null, null);

-- UPDATE PROFILE INFORMATION function UpdateProfile(id, role, firstName, lastName, description)     DO THIS AFTER MAKING THE ACCOUNT, SO THEY DONT SEE ALL NULL ON THEIR PROFILE. "JUST A FEW MORE THINGS..."
update ProfileInfo set
	role = "ADMIN",
	first_name = "Tyler",
	last_name = "George",
	description = "A clone of myself..."
where ProfileInfo.id = 1; -- (current user id)

-- SEND MESSAGE
insert into Messages values(1, 2, "REQUEST", now(), "Will you be my tutor?");

-- GET MESSAGES
select sender_id, message_time, message_type, message from AccountInfo, Messages where id = receiver_id order by message_time asc;

-- ADMIN TABLE
select id, email, role, first_name, last_name, description from AccountInfo natural join ProfileInfo;
