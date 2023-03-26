# 16-Authentication-and-Security

Security: Level 4
-------------------------
bcrypt Hash Encryption


- Level 1 security: match the password stored in the database
- Level 2 security: Mongoose encryption (AES encryption)
- Level 3 security: md5 Hash Encryption

    1. hash = md5(password)
    2. hash = md5(password + salt)  
    * Problem: fast decryption (20B MD5 Hashes/s)

- Level 4 security: bcrypt Hash Encryption

    1. hash = password + hash salting rounds
    * Benefit: slow decryption (17K bcrypt Hashes/s)




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
1. Only match password
2. AES encryption (mongoose-encryption)
3. md5 Hash Encryption + salt
4. bcrypt Hash Encryption + salt rounds

