# 16-Authentication-and-Security

<<<<<<< HEAD
Security: Level 1
------------------------
Match Password that is stored in database
=======
Security: Level 3
-------------------------
md5 Hash Encryption


- Level 1 security: match the password stored in the database
- Level 2 security: Mongoose encryption (AES encryption)
- Level 3 security: md5 Hash Encryption

1. hash = md5(password)
2. hash = md5(password + salt)  
* Problem: fast decryption (20B MD5 Hashes/s)

---------------------------


Threats
---------------------------
* Hash Table
* Dictionary Attack/ Password Attack
* SQL Injection
* Phishing Attack
* Malware Attack
* Man-in-the-Middle Attack
* DoS Attack (Denial-of-Service Attack)



Summary
---------------------------
1. match database
2. AES encryption (mongoose-encryption)

3. md5 Hash Encryption
- hash = md5(password)
- salt
- hash = md5(password + salt)

>>>>>>> main
